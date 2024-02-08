const express = require('express');
const { getDB } = require('../database');
const { ObjectId } = require('mongodb');

const router = express.Router();

router.delete('/:id', async (req, res) => {
    const db = getDB();
    try {
        const { id } = req.params;

        const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;