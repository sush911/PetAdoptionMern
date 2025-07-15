const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const { user } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

const verifyAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized.' });
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only.' });
  next();
};

module.exports = { verifyToken, verifyAdmin };
