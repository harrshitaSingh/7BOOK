const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  const JWT_KEY = process.env.JWT_KEY;
  return jwt.sign({ id }, JWT_KEY, { expiresIn: "30d" });
};
module.exports = generateToken;
