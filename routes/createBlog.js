const express = require('express');
const { getDB } = require('../database');
const { ObjectId } = require('mongodb');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post('/', [
    body('title').notEmpty(),
    body('body').notEmpty()
], async (req, res) => {
    const db = getDB();
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, body, author } = req.body;
        const newBlog = { title, body, author, createdAt: new Date() };

        const result = await db.collection('blogs').insertOne(newBlog);
        res.status(201).json({ message: 'Blog post created successfully', blog: result.ops });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;