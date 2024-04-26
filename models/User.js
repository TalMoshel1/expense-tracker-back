const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    },
    transactions: {
        type: {
            year: {
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
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
