const express = require('express');
const { getDB } = require('../database');
const router = express.Router();

router.get('/', async (req, res) => {
    const db = getDB();
    try {
        const blogs = await db.collection('blogs').find().toArray();
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;