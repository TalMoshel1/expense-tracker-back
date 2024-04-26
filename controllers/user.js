const User = require('../models/User.js');
const { getPasswordCreationError } = require('../utilz/passwordUtilz.js');
const userService = require('../services/users.js');

async function createUser(req, res) {
   try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await userService.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const passwordError = getPasswordCreationError(password);
        if (passwordError) {
            return res.status(400).json({ error: passwordError });
        }

        const user = await userService.createUser(firstName, lastName, email, password);
        return res.status(201).json(user);
    } catch(error) {
        console.error('Error in createUser:', error);
        return res.status(500).json({ error: error.message });
    }
}


async function getUser(req, res) {
    try {
         const { email, password } = req.body;
         const user = await userService.login(email, password);
         return res.status(200).json(user);
     } catch(error) {
         return res.status(401).json({ error: error.message });
     }
 }

module.exports = {
    createUser,
    getUser
};
