//this is the base api
//all other apis are routed from here

const express = require('express');
const router = express.Router();

const auth = require('./Route/authRoute');
const admin = require('./Route/adminRoute');
const workspace = require('./Route/workspaceRoute');

router.get('/', (req, res) => {
    res.send('Hello world!\n');
});

router.use('/auth', auth);
router.use('/admin', admin);
router.use('/workspace', workspace);

module.exports = router;