const app = require("express")();
import {env} from "node:process";
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const xssClean = require("xss-clean");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

import apiRouter from "./src/Routes/api";
const demoMiddleware = require("./src/Middlewares/demo");

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(hpp({ checkBody: true, checkQuery: true }));
app.use(xssClean());

// Database Connection
const MONGODB_URI = env.MONGODB_URI as string;
const mongoose = require('mongoose');
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// Routes
app.use('/api/v1', apiRouter);

export default app;
