const userModel = require("../DB/Module/user.model");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../DB/Module/blacklistToken.model");


async function userAuthentication(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Your are not authoized" });

  const isBlacklisted=await BlacklistToken.findOne({token})
  if(isBlacklisted) return res.json({message: "Not authorized"})
  try {
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await userModel.findById(userId);

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
}
module.exports = userAuthentication;
