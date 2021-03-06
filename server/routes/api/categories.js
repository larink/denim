import { Router } from 'express';
import Category from '../../models/Category';

const router = new Router();

router.get('/:gender', async (req, res) => {
  let filters = { gender: req.params.gender };

  if (req.query.id) {
    filters = { _id: req.query.id, gender: req.params.gender };
  }
  console.log(filters);

  try {
    const categories = await Category.find(filters);

    res.status(200).json(categories);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Category({
      name: req.body.name,
      gender: req.body.gender,
    });

    category.save();
    res.status(200).json(category);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categories = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );

    res.status(200).json(categories);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    Category.findByIdAndRemove(req.params.id);

    res.status(200).json({ succes: true, msg: 'Категория была удалена' });
  } catch (e) {
    res.status(400).json({ succes: false, msg: e.message });
  }
});

module.exports = router;
