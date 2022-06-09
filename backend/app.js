const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv');
const cors = require('cors');

app.use(cors());

const errorMiddleware = require("./middleware/error");

// Config

  dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const customize = require("./routes/customRoute");
const audit = require("./routes/auditRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", customize);
app.use("/api/v1", audit);


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
