// app.js
const express = require('express');
const app = express();
const baseRoute = require("./router");
const fileUpload = require('express-fileupload');


app.use(express.json()); // Parse JSON request bodies
app.use(fileUpload()); // File upload middleware
app.use("/",baseRoute);



module.exports = app;