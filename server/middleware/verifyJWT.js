const jwt = require("jsonwebtoken");
const User = require('../model/User')

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).send("Access Denied");
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send("Invalid Token"); //invalid token
    const user = await User.findOne({_id:decoded.id} , {password: 0})
    req.user = user
    next();
  });
};

module.exports = verifyJWT;
