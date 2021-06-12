import { Router } from 'express';
import bcrypt, { hash } from 'bcryptjs';
import config from '../../config';
import jwt from 'jsonwebtoken';
import { auth } from '../../middleware/auth';
// User Model
import User from '../../models/User';

const { JWT_SECRET } = config;
const router = Router();

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req);

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Заполните все поля' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error('Пользователь не существует');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Неправильные данные');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');

    console.log(user);

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
        cartItems: user.cartItems,
        history: user.history,
        address: user.address,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.put('/update', auth, async (req, res) => {
  try {
    let hashed;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Something went wrong with bcrypt');

      hashed = await bcrypt.hash(req.body.password, salt);
      if (!hash) throw Error('Something went wrong hashing the password');
    }

    const prevUser = await User.findById(req.user.id);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name || prevUser.name,
        email: req.body.email || prevUser.email,
        password: hashed || prevUser.password,
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Заполните все поля' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error('Пользователь уже сущетсвует');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({
      token,
      user: {
        _id: savedUser._id,
        role: savedUser.role,
        name: savedUser.name,
        email: savedUser.email,
        cartItems: savedUser.cartItems,
        history: savedUser.history,
        address: savedUser.address,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

export default router;
