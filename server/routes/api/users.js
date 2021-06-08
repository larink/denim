import { Router } from 'express';
import { auth, authRole } from '../../middleware/auth';
import Payment from '../../models/Payment';
// User Model
import User from '../../models/User';
import Item from '../../models/Item';

const router = Router();

/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users exist');
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/users/cartItems
 * @desc    Get all users
 * @access  Private
 */

//  db.collection.update({ 'data.username1': {$exists: true} }, { $set: { 'data.username1': newValue }}, true)
router.post('/cartItems', async (req, res) => {
  const { userId, productToCart } = req.body;

  User.findOne({ _id: userId }, (err, userInfo) => {
    let duplicate = false;

    userInfo.cartItems.forEach((item) => {
      if (item._id == productToCart._id) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: userId, 'cartItems._id': productToCart._id },
        { $inc: { 'cartItems.$.quantity': 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cartItems);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            cartItems: {
              _id: productToCart._id,
              size: productToCart.size,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cartItems);
        }
      );
    }
  });
});

/**
 * @route   GET api/users/removeFromCart
 * @desc    Get all users
 * @access  Private
 */

router.get('/removeFromCart', async (req, res) => {
  console.log(req.query);

  User.findOneAndUpdate(
    { _id: req.query._id },
    {
      $pull: { cartItems: { _id: req.query.product } },
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cartItems;
      let array = cart.map((item) => {
        return item.id;
      });
      if (err) console.log(err);

      User.find({ _id: { $in: array } })
        .populate('name')
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cart,
          });
        });

      if (err) return res.json({ success: false, err });
    }
  );
});

router.post('/successBuy', auth, async (req, res) => {
  let history = [];
  let transactionData = {};

  let productQuantities = [];

  try {
    await req.body.cartDetail.forEach((item) => {
      productQuantities.push({
        id: item._id,
        quantity: item.quantity,
      });

      history.push({
        dateOfPurchase: Date.now(),
        imageUrl: item.imageUrl,
        name: item.name,
        id: item._id,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        paymentId: req.body.paymentData.paymentID,
      });
    });

    console.log(productQuantities);
    productQuantities.forEach((obj) =>
      Item.findByIdAndUpdate(obj.id, {
        $inc: { countInStock: -obj.quantity },
      })
    );

    transactionData.user = {
      id: req.user.id,
      name: req.body.user.name,
      email: req.body.user.email,
      address: req.body.user.address,
    };
    transactionData.products = history;
    transactionData.data = req.body.paymentData;

    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { history: history }, $set: { cartItems: [] } },
      { new: true },
      (err, user) => {
        if (err) return res.json({ success: false, err });

        const payment = Payment(transactionData);
        payment.save();

        res.status(200).json({
          success: true,
          cartItems: user.cartItems,
          cartDetail: [],
        });
      }
    );
  } catch (e) {
    res.status(400).json({ msg: e.msg });
  }
});

router.get('/orders', async (req, res) => {
  let data = await Payment.find();
  let ids = [];
  let orderIds = [];
  data.forEach((obj) => ids.push(obj.user.id));

  try {
    data.forEach((obj) => {
      if (obj.user.id === req.query.userId) {
        orderIds.push(obj._id);
      }
    });

    const orders = await Payment.find({ _id: { $in: orderIds } });

    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json({ msg: e.msg });
  }
});

router.get('/admin', auth, authRole('admin'), async (req, res) => {
  console.log(req.user);
});

router.get('/address/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Error('No address exist');
    res.json({ address: user.address });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.put('/address/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        address: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          tel: req.body.tel,
          home: req.body.home,
          country: req.body.country,
          city: req.body.city,
          region: req.body.region,
          index: req.body.index,
        },
      },
      { new: true }
    );
    if (!user) throw Error('No users exist');
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

export default router;
