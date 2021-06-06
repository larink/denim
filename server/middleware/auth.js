import jwt from 'jsonwebtoken';
import config from '../config';

const { JWT_SECRET } = config;

export const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

export const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send('Нету доступа');
    }

    next();
  };
};
