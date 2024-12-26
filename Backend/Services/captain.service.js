const CaptainModel = require("../DB/Module/captain.model");

async function createCaptain(
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicalType
) {

  if ((!firstName, !email, !password, !color, !plate, !capacity, !vehicalType))
    throw new Error("All fields are reqire");
  try {
    const captain = await CaptainModel.create({
      firstName,
      lastName,
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicalType,
      },
    });
    return captain
  } catch (error) {
    throw new Error(`'Error with + ${error}`);
  }
}

module.exports = createCaptain;
