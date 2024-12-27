const express = require('express');
const path = require('path');
const pool = require('./db'); // مسیر صحیح فایل db
const app = express(); // تعریف app
const PORT = process.env.PORT || 3001;
const cors = require('cors'); // اضافه کردن cors
const productsRoutes = require('./routes/products');
const router = express.Router();

// Load environment variables
require('dotenv').config(); // فقط .env استفاده می‌شود

// فعال‌سازی CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // مقدار پویا برای محیط‌های مختلف
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // متدهای مجاز
  credentials: true, // اجازه ارسال کوکی‌ها
}));

app.use('/backend/products', productsRoutes);

// Middleware
app.use(express.json());

// Test Route with /backend prefix
app.get('/backend/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, timestamp: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to fetch products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products: ' + error.message });
  }
});
module.exports = router;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});