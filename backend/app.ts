/*
 * Add all your Express app configurations here
 * */

const app = require("express")();
require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const xssClean = require("xss-clean");
const bodyParser = require("body-parser");

import apiRouter from "./src/Routes/api";
const demoMiddleware = require("./src/Middlewares/demo");

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(hpp({ checkBody: true, checkQuery: true }));
app.use(xssClean());

// Database Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// Routes
app.use('/api/v1', apiRouter);

export default app;
