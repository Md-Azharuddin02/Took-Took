const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, "First Name can't be less than 3 charecter"],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [6, "First Name can't be less than 6 charecter"],
  },
  hashPassword: {
    type: String,
    required: true,
    select: false,
    minlength: [6, "First Name can't be less than 6 charecter"],
  },
  SocketId: {
    type: String,
  },
});



userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};
userSchema.methods.comparePassword = async function (password) {
  console.log(password)
  console.log(this.hashPassword)

  return await bcrypt.compare(password, this.hashPassword);
};
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = model("user", userSchema);
module.exports = userModel;
