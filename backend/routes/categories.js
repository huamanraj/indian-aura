const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');

// Get all categories (public)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all categories including inactive (admin only)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1, createdAt: -1 });
    
    // Get product count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const productCount = await Product.countDocuments({ category: cat.name });
        return {
          ...cat.toObject(),
          productCount
        };
      })
    );
    
    res.json(categoriesWithCount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single category (public)
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create category (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, image, order } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({
      name,
      description,
      image,
      order: order || 0
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(400).json({ message: err.message });
  }
});

// Update category (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, description, image, order, isActive } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // Check if name is being changed and if new name already exists
    if (name && name.toLowerCase() !== category.name.toLowerCase()) {
      const existingCategory = await Category.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: req.params.id }
      });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category name already exists' });
      }
    }

    if (name) category.name = name;
    if (description !== undefined) category.description = description;
    if (image !== undefined) category.image = image;
    if (order !== undefined) category.order = order;
    if (isActive !== undefined) category.isActive = isActive;
    category.updatedAt = Date.now();

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(400).json({ message: err.message });
  }
});

// Delete category (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // Check if there are products in this category
    const productCount = await Product.countDocuments({ category: category.name });
    if (productCount > 0) {
      return res.status(400).json({ 
        message: `Cannot delete category. ${productCount} product(s) are using this category. Please reassign or delete them first.` 
      });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reorder categories (admin only)
router.put('/reorder', authMiddleware, async (req, res) => {
  try {
    const { categories } = req.body; // Array of { id, order }

    if (!Array.isArray(categories)) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    await Promise.all(
      categories.map(async ({ id, order }) => {
        await Category.findByIdAndUpdate(id, { order, updatedAt: Date.now() });
      })
    );

    const updatedCategories = await Category.find().sort({ order: 1 });
    res.json(updatedCategories);
  } catch (err) {
    console.error('Error reordering categories:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
