const express = require('express');
const pool = require('../db/db');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM products');
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products: ' + error.message });
    }
});

// Add new product
router.post('/', async (req, res) => {
    const { name, price, stock } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *',
            [name, price, stock]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
