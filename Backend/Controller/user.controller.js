const userModel = require("../DB/Module/user.model");
const { validationResult } = require("express-validator");
const createUser = require("../Services/user.service");
const { use } = require("../app");

async function userRegister(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ error: error.array() });
  const { firstName, lastName, email, password } = req.body;
  const hashPassword = await userModel.hashPassword(password);
  const user = await createUser(firstName, lastName, email, hashPassword);
  const token = user.generateAuthToken();
  return res.status(201).json({ user: user, token: token });
}

async function userLogin(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ error: error.array() });
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+hashPassword");
  if (!user)
    return res.status(400).json({ message: "Invalid email and password" });
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid email and password" });
  const token = user.generateAuthToken();
  return res.status(200).json({ user: user, token: token });
}

module.exports = { userRegister, userLogin };
