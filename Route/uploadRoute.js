const express = require("express");
const router = express.Router();

// single route
const { single } = require('../Controller/uploadController');
router.post('/single',single);