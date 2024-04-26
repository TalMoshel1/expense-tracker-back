const mongoose = require('mongoose');


const recordsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true 
    },
    years: {
        type: Object, 
        required: true,
        default: () => {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear().toString();
            const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
            return {
                [currentYear]: {
                    [currentMonth]: []
                }
            };
        }
    }
});

const Records = mongoose.model('Records', recordsSchema);

module.exports = Records;