const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verifyToken = promisify(jwt.verify);

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).send({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; 
  try {
    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    req.user = decoded.username;
    next(); 
  } catch(err) {
    res.status(401).send({ msg: "Invalid or expired token" });
  }
};
const mentorauthenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).send({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; 
  try {
    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    req.user = decoded.username; 
    next(); 
  } catch(err) {
    res.status(401).send({ msg: "Invalid or expired token" });
  }
};

module.exports = { authenticationMiddleware ,mentorauthenticationMiddleware};
