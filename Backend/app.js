const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const dbConnections = require("./DB/db.connection");
const userRouter = require("./Routes/user.route");
const captainRouter = require("./Routes/captain.route");
const cookieParser= require('cookie-parser')

const app = express();
dbConnections();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())


app.use("/users", userRouter);
app.use("/captain", captainRouter);




module.exports = app;
