

async function createUser(req, res) {
    const { username, password } = req.body;
    //get token
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    if (username.length < 6 || password.length < 6) {
        return res.status(400).json({ error: 'Username and password must be at least 6 characters long.' });
    }
    eiin = res.locals.eiin;
    try {
        const { userAvailable } = require('../DB/adminDB');
        const isAvailable = await userAvailable(username);
        if (!isAvailable) {
            res.status(400).json({ error: 'Username already exists.' });
        }
        else{
            const { createUser } = require('../DB/adminDB');
            const isCreated = await createUser(eiin, username, password);
            if (isCreated) {
                res.status(200).json({ message: 'User Created!' });
            } else {
                res.status(401).json({ error: 'User Creation Failed!' });
            }
        }
    }
    catch (err) {
        console.log(`Error creating user: ${err}`);
        res.status(500).json({ error: 'Internal error, please try again.' });
    }
    finally {
        
    }
}

module.exports = {
    createUser
}

