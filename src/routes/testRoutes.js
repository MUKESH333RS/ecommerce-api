const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');  // Test query
        res.json({ message: 'Database is working', timestamp: result.rows[0].now });
    } catch (error) {
        console.error('DB Test Error:', error);
        res.status(500).json({ message: 'Database connection failed' });
    }
});

module.exports = router;
