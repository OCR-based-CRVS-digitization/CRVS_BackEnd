// app.js
const express = require('express');
const app = express();
const baseRoute = require("./router");
var cors = require('cors');
const morgan = require('morgan');


app.use(express.json()); // Parse JSON request bodies
app.use(morgan('combined')); // Log HTTP requests

app.use(cors({
    origin: '*', // Be sure to switch to your production domain
    optionsSuccessStatus: 200
}));

app.use("/",baseRoute);




module.exports = app;