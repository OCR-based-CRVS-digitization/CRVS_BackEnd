const express = require("express");
const router = express.Router();


// Login route
const { authLogin } = require('../Controller/authController');
router.post('/login', authLogin);

// admin login
const { authLoginAdmin } = require('../Controller/authController');
router.post('/loginAdmin', authLoginAdmin);



module.exports = router;