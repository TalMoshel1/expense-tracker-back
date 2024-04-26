const Records = require('../models/Records.js');

async function createRecords(userId) {
    try {
        const existingRecords = await Records.findOne({ userId });

        if (existingRecords) {
            return existingRecords;
        }

        const newRecords = new Records({ userId });

        await newRecords.save();

        return newRecords;
    } catch (error) {
        console.error('Error creating records:', error);
        throw error;
    }
}

module.exports = {
    createRecords
};