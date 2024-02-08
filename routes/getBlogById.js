const express = require('express');
const { getDB } = require('../database');
const { ObjectId } = require('mongodb');

const router = express.Router();

router.get('/:id', async (req, res) => {
    const db = getDB();
    try {
        const { id } = req.params;
        const blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) });

        if (!blog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;