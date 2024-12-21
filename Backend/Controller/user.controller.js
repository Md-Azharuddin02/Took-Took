const userModel = require("../DB/Module/user.model");
const { validationResult } = require("express-validator");
const createUser = require("../Services/user.service");

async function userRegister(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ error: error.array() });
  const { firstName, lastName, email, password } = req.body;
  const hashPassword = await userModel.hashPassword(password);
  const user= await createUser(firstName, lastName, email, hashPassword);
  const token= user.generateAuthToken()
  return res.status(201).json({user:user,token:token});
}

module.exports = { userRegister };
