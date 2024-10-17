const jwt = require('../utils/jwtUtils');

module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log("token:", token)
  try {
    const decoded = jwt.verifyToken(token);
    req.user = decoded;
    console.log(req.user)
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

