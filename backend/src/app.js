const express = require('express');
const path = require('path');
const pool = require('./db'); // مسیر صحیح فایل db
const app = express(); // تعریف app
const PORT = process.env.PORT || 3001;
const cors = require('cors'); // اضافه کردن cors
const productsRoutes = require('./routes/products');

// فعال‌سازی CORS
app.use(cors({
  origin: 'http://localhost:3000', // آدرس فرانت‌اند
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // متدهای مجاز
  credentials: true, // اجازه ارسال کوکی‌ها
}));

app.use('/backend/products', productsRoutes);

// Load environment variables
require('dotenv').config(); // فقط .env استفاده می‌شود

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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});