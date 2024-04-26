const mongoose = require('mongoose');
require('dotenv').config();

const password = process.env.DB_CONNECTION_PASSWORD;

async function connectToDb() {
    try {
        return await mongoose.connect(`mongodb+srv://talmoshel444:tgKP0ecRgjWbo6jS@cluster0.fhvewii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    } catch (error) {
        console.error('Error connecting to DB: ', error);
        throw error; 
    }
}

module.exports = connectToDb;
