const { Schema, model } = require("mongoose");

const blacklistTokenSchema = Schema(
  {
    token: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400, 
    },
  },
  { timestamps: true }
);

const BlacklistToken = model("blacklistToken", blacklistTokenSchema);

module.exports = BlacklistToken;
