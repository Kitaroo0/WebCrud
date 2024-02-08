const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

async function connectToDB() {
    try {
        await client.connect();
        db = client.db('dbBlog');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}

module.exports = {
    connectToDB,
    getDB: () => db,
    ObjectId
};