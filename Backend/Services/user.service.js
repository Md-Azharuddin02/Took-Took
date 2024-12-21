const userModel = require("../DB/Module/user.model");

const createUser = async (firstName, lastName, email, hashPassword ) => {
  if (!firstName || !email || !hashPassword)
    throw new Error("All field are require");

  try {
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      hashPassword,
    });
    return user;
  } catch (error) {
    console.error(`user not created ${error}`);
  }
};

module.exports = createUser;
