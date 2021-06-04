import { Router } from 'express';
import auth from '../../middleware/auth';
import Payment from '../../models/Payment';
// User Model
import User from '../../models/User';

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

  await req.body.cartDetail.forEach((item) => {
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

  transactionData.user = {
    id: req.user.id,
    name: req.body.user.name,
    email: req.body.user.email,
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

export default router;
