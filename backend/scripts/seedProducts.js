require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

const products = [
  {
    name: "Handcrafted Diya",
    image: "/image1.jpeg",
    price: 499,
    category: "Festive Essentials",
    description: "Beautifully handcrafted brass diya with intricate traditional patterns. Perfect for daily puja and festive celebrations. Each piece is carefully made by skilled artisans.",
    trending: true,
  },
  {
    name: "Decorative Toran",
    image: "/image2.jpeg",
    price: 899,
    category: "Festive Essentials",
    description: "Vibrant handcrafted toran door hanging adorned with beads, mirrors, and traditional motifs. Welcomes prosperity and positive energy into your home.",
    trending: true,
  },
  {
    name: "Elegant Puja Thali",
    image: "/image3.jpeg",
    price: 1299,
    category: "Ceremonial Artistry",
    description: "Exquisite brass puja thali with engraved traditional designs. Includes kumkum and chandan holders. Elevates every spiritual ritual with grace.",
    trending: true,
  },
  {
    name: "Shubh Labh Hanging",
    image: "/image1.jpeg",
    price: 349,
    category: "Auspicious Decor",
    description: "Traditional Shubh Labh wall hanging crafted with vibrant colors and auspicious symbols. Invites prosperity and positive energy into your living space.",
    trending: true,
  },
  {
    name: "Traditional Warmala",
    image: "/image2.jpeg",
    price: 599,
    category: "Ceremonial Artistry",
    description: "Elegant traditional warmala garland made with fresh flowers and decorative elements. Perfect for wedding ceremonies and festive occasions.",
    trending: false,
  },
  {
    name: "Decorative Chowki",
    image: "/image3.jpeg",
    price: 1899,
    category: "Ceremonial Artistry",
    description: "Handcrafted wooden chowki with intricate carvings and traditional paint work. Ideal for placing deities and performing rituals with devotion.",
    trending: false,
  },
  {
    name: "Brass Aarti Stand",
    image: "/image1.jpeg",
    price: 749,
    category: "Ceremonial Artistry",
    description: "Premium brass aarti stand with elegant design. Perfect for performing aarti during daily prayers and special ceremonies.",
    trending: false,
  },
  {
    name: "Festive Rangoli Set",
    image: "/image2.jpeg",
    price: 299,
    category: "Festive Essentials",
    description: "Vibrant rangoli stencils with colorful powders. Create beautiful traditional designs at your doorstep for festivals and celebrations.",
    trending: false,
  },
  {
    name: "Incense Holder",
    image: "/image3.jpeg",
    price: 199,
    category: "Auspicious Decor",
    description: "Elegant handcrafted incense holder with traditional motifs. Fills your home with divine fragrance and peaceful ambiance.",
    trending: false,
  },
  {
    name: "Decorative Bell",
    image: "/image1.jpeg",
    price: 649,
    category: "Auspicious Decor",
    description: "Beautiful brass temple bell with intricate engravings. Produces a resonant sound that purifies the atmosphere during prayers.",
    trending: false,
  },
  {
    name: "Marigold Garland",
    image: "/image2.jpeg",
    price: 149,
    category: "Festive Essentials",
    description: "Fresh and vibrant marigold garland for decorating homes and temples. A symbol of auspiciousness in Indian traditions.",
    trending: false,
  },
  {
    name: "Ceremonial Kalash",
    image: "/image3.jpeg",
    price: 899,
    category: "Ceremonial Artistry",
    description: "Traditional brass kalash pot with coconut and mango leaves. Symbolizes abundance and is essential for all auspicious ceremonies.",
    trending: false,
  },
];

const categoryTags = {
  "Festive Essentials": ["festive", "diwali", "celebration", "traditional", "home-decor"],
  "Ceremonial Artistry": ["ceremony", "puja", "ritual", "traditional", "handcrafted"],
  "Auspicious Decor": ["auspicious", "decor", "spiritual", "traditional", "home-decor"],
};

async function seed() {
  try {
    await connectDB();

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const createdProducts = [];

    for (const item of products) {
      const product = new Product({
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        images: [{
          url: item.image,
          public_id: item.image.replace(/\//g, '').replace(/\.(jpeg|jpg|png|webp)$/i, ''),
        }],
        inStock: true,
        tags: categoryTags[item.category] || ["traditional", "indian"],
      });

      const saved = await product.save();
      createdProducts.push(saved);
      console.log(`Created: ${saved.name} (${saved.slug})`);
    }

    // Set related products: link products within the same category
    for (const product of createdProducts) {
      const related = createdProducts
        .filter(p => p.category === product.category && p._id.toString() !== product._id.toString())
        .map(p => p._id);

      if (related.length > 0) {
        await Product.findByIdAndUpdate(product._id, { relatedProducts: related });
      }
    }
    console.log('Related products linked');

    console.log(`\nSeeded ${createdProducts.length} products successfully`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
