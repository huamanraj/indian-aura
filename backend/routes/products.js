const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search products (public)
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.json({ success: true, results: [], count: 0 });
    }

    const searchQuery = query.trim();
    const regex = new RegExp(searchQuery, 'i'); // Case-insensitive regex

    // Search across name, description, category, and tags fields
    const products = await Product.find({
      $or: [
        { name: regex },
        { description: regex },
        { category: regex },
        { tags: regex }
      ]
    }).limit(10).sort({ createdAt: -1 });

    res.json({
      success: true,
      results: products,
      count: products.length
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message,
      results: [],
      count: 0
    });
  }
});

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create product (admin only)
router.post('/', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, category, inStock, tags } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Upload images to Cloudinary
    const imageUploads = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'indian-aura/products',
              resource_type: 'image'
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });

        imageUploads.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    }

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      category,
      images: imageUploads,
      inStock: inStock === 'true' || inStock === true,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : []
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(400).json({ message: err.message });
  }
});

// Update product (admin only)
router.put('/:id', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, category, inStock, tags, existingImages } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Handle new image uploads
    const newImageUploads = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'indian-aura/products',
              resource_type: 'image'
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });

        newImageUploads.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    }

    // Parse existing images (images that weren't deleted)
    let finalImages = [];
    if (existingImages) {
      try {
        finalImages = typeof existingImages === 'string' 
          ? JSON.parse(existingImages) 
          : existingImages;
      } catch (e) {
        finalImages = [];
      }
    }

    // Delete removed images from Cloudinary
    const existingImageIds = finalImages.map(img => img.public_id);
    for (const img of product.images) {
      if (!existingImageIds.includes(img.public_id)) {
        try {
          await cloudinary.uploader.destroy(img.public_id);
        } catch (err) {
          console.error('Error deleting image from Cloudinary:', err);
        }
      }
    }

    // Combine existing and new images
    finalImages = [...finalImages, ...newImageUploads];

    // Update product
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price ? parseFloat(price) : product.price;
    product.category = category || product.category;
    product.inStock = inStock !== undefined ? (inStock === 'true' || inStock === true) : product.inStock;
    product.tags = tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : product.tags;
    product.images = finalImages;
    product.updatedAt = Date.now();

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(400).json({ message: err.message });
  }
});

// Delete product (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Delete images from Cloudinary
    for (const img of product.images) {
      try {
        await cloudinary.uploader.destroy(img.public_id);
      } catch (err) {
        console.error('Error deleting image from Cloudinary:', err);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;