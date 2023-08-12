const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const { reqAthenticate } = require('../authentication');

const { fileUpload } = require('../Controller/fileUploadController');
router.post('/single', reqAthenticate,upload.single("filename"), fileUpload);


module.exports = router;