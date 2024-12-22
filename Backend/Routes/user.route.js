const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  userRegister,
  userLogin,
  getUserProfile,
  userLogOut,
} = require("../Controller/user.controller");
const authMiddleWare = require("../Middlewares/auth.middleware");

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

router
  .route("/login")
  .post(
    [
      body("email")
        .isEmail()
        .isLength({ min: 6 })
        .withMessage("Email must be greater than 6 charector"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be greater than 6 charector"),
    ],
    userLogin
  );

router.route("/profile").get(authMiddleWare, getUserProfile);
router.route("/logout").post(authMiddleWare, userLogOut);

module.exports = router;
