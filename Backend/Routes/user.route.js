const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { userRegister } = require("../Controller/user.controller");

router
  .route("/register")
  .post(
    [
      body("firstName")
        .isLength({ min: 3 })
        .withMessage("Full name must be greater than 3 charector"),
      body("email")
        .isEmail()
        .isLength({ min: 6 })
        .withMessage("Email must be greater than 6 charector"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be greater than 6 charector"),
    ],
    userRegister
  );

module.exports = router;
