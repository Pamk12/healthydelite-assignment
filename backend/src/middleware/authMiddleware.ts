import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  const token = authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
  if (!token) {
    return res.status(401).json({ message: 'Token format is incorrect, authorization denied.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};