const { generateToken } = require('../authentication');

async function authLogin(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const { authenticateUser } = require('../DB/authDB');
        const isAuthenticated = await authenticateUser(username, password);

        if (isAuthenticated) {
            const token = generateToken({ username }, 0);
            res.status(200).json({ message: 'Login successful!', token });
        } else {
            res.status(401).json({ error: 'Invalid credentials.' });
        }
    }
    catch (err) {
        console.log(`Error authenticating user: ${err}`);
        res.status(500).json({ error: 'Internal error, please try again.' });
    }

}

async function authLoginAdmin(req, res) {
    const { eiin, password } = req.body;
    if (!eiin || !password) {
        return res.status(400).json({ error: 'eiin and password are required.' });
    }

    try {
        const { authenticateAdmin } = require('../DB/authDB');
        const isAuthenticated = await authenticateAdmin(eiin, password);

        if (isAuthenticated) {
            const token = generateToken({ eiin }, 1);
            res.status(200).json({ message: 'Login successful!', token });
        } else {
            res.status(401).json({ error: 'Invalid credentials.' });
        }
    }
    catch (err) {
        console.log(`Error authenticating admin: ${err}`);
        res.status(500).json({ error: 'Internal error, please try again.' });
    }

}

module.exports = {
    authLogin,
    authLoginAdmin
}