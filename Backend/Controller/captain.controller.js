const { validationResult } = require("express-validator");
const createCaptain = require("../Services/captain.service");

async function captainRegister(req, res) {
  const error = validationResult(req);
  if (!error.isEmpty) return res.status(400).json({ message: error.array() });

  const {
    firstName,
    lastName,
    email,
    password,
    color,
    plate,
    capacity,
    vehicalType,
  } = req.body;

  try {
    const captain = await createCaptain(
      firstName,
      lastName,
      email,
      password,
      color,
      plate,
      capacity,
      vehicalType
    );

    return res.json({ captain: captain });
  } catch (error) {
    return res.json({ 'message': error });
  }
}

module.exports = { captainRegister };
