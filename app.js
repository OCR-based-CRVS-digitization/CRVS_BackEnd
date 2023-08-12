// app.js
const express = require('express');
const app = express();
const baseRoute = require("./router");
var cors = require('cors');
const fileUpload = require('express-fileupload');


app.use(express.json()); // Parse JSON request bodies
// app.use(fileUpload()); // File upload middleware

app.use(cors({
    origin: '*', // Be sure to switch to your production domain
    optionsSuccessStatus: 200
}));

app.use("/",baseRoute);




module.exports = app;