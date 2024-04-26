const authService = require('../services/auth.js');
const userService = require('../services/users.js');


async function signIn(req, res) {
    try {
        const { email, password } = req.body;
        const isUser = userService.getUserByMail
        const token = await authService.signIn(email, password);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    signIn
};
