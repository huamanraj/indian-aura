const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Contact = require('./models/Contact');
const Settings = require('./models/Settings');
const authMiddleware = require('./middleware/auth');

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
  origin: true, // Allow all origins in development
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/settings', require('./routes/settings'));

// Dashboard stats (admin only)
app.get('/api/stats', authMiddleware, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const settings = await Settings.findOne();
    const categoriesCount = await Category.countDocuments({ isActive: true });

    const totalImages = await Product.aggregate([
      { $project: { imageCount: { $size: { $ifNull: ['$images', []] } } } },
      { $group: { _id: null, total: { $sum: '$imageCount' } } }
    ]);

    res.json({
      totalProducts,
      totalContacts,
      categories: categoriesCount,
      totalImages: totalImages[0]?.total || 0,
      hasWhatsApp: !!(settings?.whatsappNumber)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});