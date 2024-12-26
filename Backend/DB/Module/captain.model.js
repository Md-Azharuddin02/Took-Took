const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = Schema({
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
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      require: true,
      minlength: [3, "Color must be 3 charector long"],
    },
    plate: {
      type: String,
      require: true,
      minlength: [3, "Plate must be 3 charector long"],
    },
    capacity: {
      type: Number,
      require: true,
      minlength: [1, "Capacity must be at least 1"],
    },
    vehicalType: {
      type: String,
      require: true,
      enum: ["Car", "Motercycle", "Auto"],
    },
    location: {
      lati: {
        type: Number,
      },
      long: {
        type: Number,
      },
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};
captainSchema.methods.comparePassword = async function (password) {
  console.log(password);
  console.log(this.hashPassword);

  return await bcrypt.compare(password, this.hashPassword);
};
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const CaptainModel = model("captain", captainSchema);
module.exports = CaptainModel;
