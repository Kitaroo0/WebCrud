const express = require('express');
const { connectToDB } = require('./database');
const createBlogRouter = require('./routes/createBlog');
const getBlogsRouter = require('./routes/getBlogs');
const getBlogByIdRouter = require('./routes/getBlogById');
const updateBlogRouter = require('./routes/updateBlog');
const deleteBlogRouter = require('./routes/deleteBlog');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function startServer() {
    try {
        await connectToDB();
        app.use('/blogs', createBlogRouter);
        app.use('/blogs', getBlogsRouter);
        app.use('/blogs', getBlogByIdRouter);
        app.use('/blogs', updateBlogRouter);
        app.use('/blogs', deleteBlogRouter);
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

startServer();