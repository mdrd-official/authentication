const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");
// const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token);
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     console.log(decodedToken);
//     const user = await User.findById(decodedToken.userId);
//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ error: "Invalid credentials" });
//   }
// };
const verifyToken = async (req, res, next) => {
  try {
   
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = verifyToken;
