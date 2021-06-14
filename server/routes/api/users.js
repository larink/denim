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

router.get('/search', async (req, res) => {
  const { q } = req.query;

  try {
    const name = new RegExp(q, 'i');
    const user = await User.findOne({
      $or: [{ name }, { email: name }],
    });

    if (!user) throw Error('Мы все посмотрели, но ничего не нашли');

    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
});

/**
 * @route   GET api/users/cartItems
 * @desc    Get all users
 * @access  Private
 */

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
        _id: item._id,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        paymentId: req.body.paymentData.paymentID,
      });
    });

    productQuantities.forEach((obj) => {
      Item.findById(obj.id, function (err, item) {
        if (err) return res.json({ success: false, err });
        item.countInStock = item.countInStock - parseInt(obj.quantity);
        item.save();
      });
    });

    transactionData.user = {
      id: req.user.id,
      name: req.body.user.name,
      email: req.body.user.email,
      address: req.body.user.address,
    };
    transactionData.products = history;
    transactionData.data = req.body.paymentData;

    User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { history: transactionData }, $set: { cartItems: [] } },
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

router.get('/payments', auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  const PAGE_SIZE = 3;
  const startIndex = (Number(page) - 1) * PAGE_SIZE;

  try {
    const total = await Payment.countDocuments();
    const payments = await Payment.find().limit(PAGE_SIZE).skip(startIndex);

    res.status(200).json({
      payments,
      currentPage: Number(page),
      totalPages: Math.ceil(total / PAGE_SIZE),
    });
  } catch (e) {
    res.status(400).json({ msg: e.msg });
  }
});

router.get('/admin', auth, authRole('admin'), async (req, res) => {
  console.log(req.user);
});

router.get('/address', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) throw Error('No address exist');
    res.json({ address: user.address });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.put('/address', auth, async (req, res) => {
  try {
    const prevUser = await User.findById(req.user.id);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        address: {
          firstName: req.body.firstName || prevUser.address.firstName,
          lastName: req.body.lastName || prevUser.address.lastName,
          tel: req.body.tel || prevUser.address.tel,
          home: req.body.home || prevUser.address.home,
          country: req.body.country || prevUser.address.country,
          city: req.body.city || prevUser.address.city,
          region: req.body.region || prevUser.address.region,
          index: req.body.index || prevUser.address.index,
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
