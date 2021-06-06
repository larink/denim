import { Router } from 'express';
import { auth } from '../../middleware/auth';
// Item Model
import Item from '../../models/Item';
import Category from '../../models/Category';
// import User from '../../models/User';

const router = Router();

/**
 * @route   GET api
 * @desc    Get All Items
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    // .populate('category');

    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get('/:gender', async (req, res) => {
  const gender = req.params.gender;
  const page = parseInt(req.query.page) || 1;
  const priceRange = req.query.price;
  let minPrice, maxPrice;
  if (req.query.price) {
    minPrice = priceRange.split('<')[0] || 0;
    maxPrice = priceRange.split('<')[1] || 99999;
  }
  const sort = `${req.query.sort}`;

  let filter = {
    gender: gender,
    price: { $gte: minPrice, $lte: maxPrice },
  };

  if (req.query.category) {
    filter = {
      gender: gender,
      category: req.query.category,
      price: { $gte: minPrice, $lte: maxPrice },
    };
  }

  if (req.query.brand) {
    filter = {
      gender: gender,
      brand: req.query.brand,
      price: { $gte: minPrice, $lte: maxPrice },
    };
  }

  const PAGE_SIZE = 10;
  const startIndex = (Number(page) - 1) * PAGE_SIZE;

  try {
    const total = await Item.countDocuments({ gender: gender });
    const items = await Item.find(filter)
      .limit(PAGE_SIZE)
      .skip(startIndex)
      .sort(sort);
    if (!items) throw Error('No items');

    res.status(200).json({
      items,
      currentPage: Number(page),
      totalPages: Math.ceil(total / PAGE_SIZE),
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get('/:gender/featured', async (req, res) => {
  const gender = req.params.gender;

  try {
    const items = await Item.find({ gender, isFeatured: true });

    if (!items) throw Error('No items');

    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get('/:gender/products_by_id', async (req, res) => {
  let type = req.query.type;
  let productIds;

  if (type === 'array') {
    let ids = req.query.id.split(',');
    productIds = [];
    productIds = ids.map((item) => {
      return item;
    });
  }

  try {
    const items = await Item.find({ _id: { $in: productIds } });
    res.status(200).send(items);
  } catch (e) {
    res.status(400).send({ msg: e.msg });
  }
});

/**
 * @route   GET api/items/search
 * @desc    get searched items
 * @access  Public
 */

router.get('/search', async (req, res) => {
  const { q, gender } = req.query;

  try {
    const name = new RegExp(q, 'i');
    const items = await Item.find({
      gender,
      $or: [{ name }, { brand: name }],
    });
    if (!items) throw Error('Мы все посмотрели, но ничего не нашли');

    res.status(200).json(items);
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
});

/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */

router.get('/product/:id', async (req, res) => {
  console.log(req.params);

  try {
    const items = await Item.findById(req.params.id);
    if (!items) throw Error('No items');

    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/items
 * @desc    Create An Item
 * @access  Private
 */

router.post('/', async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Неправильная категория');

  const newItem = new Item({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    descr: req.body.descr,
    type: req.body.type,
    oldPrice: req.body.oldPrice,
    price: req.body.price,
    gender: req.body.gender,
    brand: req.body.brand,
    sizes: req.body.sizes,
    category: req.body.category,
    color: req.body.color,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  try {
    const item = await newItem.save();
    if (!item) throw Error('Something went wrong saving the item');

    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.put('/:id', async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Неправильная категория');

  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        descr: req.body.descr,
        type: req.body.type,
        oldPrice: req.body.oldPrice,
        price: req.body.price,
        gender: req.body.gender,
        brand: req.body.brand,
        sizes: req.body.sizes,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );

    if (!item) throw Error('Что-то пошло не так при изменении товара');
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   DELETE api/items/:id
 * @desc    Delete A Item
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) throw Error('No item found');

    const removed = await item.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the item');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

export default router;
