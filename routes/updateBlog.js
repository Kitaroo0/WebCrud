const express = require('express');
const { getDB } = require('../database');
const { ObjectId } = require('mongodb');

const router = express.Router();

router.put('/:id', async (req, res) => {
    const db = getDB();
    try {
        const { id } = req.params;
        const { title, body, author } = req.body;

        const result = await db.collection('blogs').updateOne(
            { _id:new ObjectId(id) },
            { $set: { title, body, author, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        res.json({ message: 'Blog post updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;