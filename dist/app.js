"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
require("./models/Table");
require("./models/Order");
require("./models/User");
const routes = require("./routes/tables");
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", require('./routes'));
app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({ 'errors': {
            message: err.message,
            error: err
        } });
});
const connection = 'mongodb+srv://user:user@cluster0.wsqb7.mongodb.net/Caffe?retryWrites=true&w=majority';
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
