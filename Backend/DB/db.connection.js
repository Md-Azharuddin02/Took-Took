const mongoose = require("mongoose");

function dbConnections() {
  return mongoose
    .connect(process.env.DB_CONNECT_URL)
    .then(() => console.log("DB connected")).catch((console.log('error occoured')))
}

module.exports = dbConnections;
