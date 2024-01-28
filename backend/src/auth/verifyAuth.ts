import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "express-async-errors";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const SECRET_KEY = 'JDSOFJG';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] as string | undefined;

  if(!token) {
    return res.status(401).json({ auth: false, message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (error: Error | null, decoded: any) => {
    if(error) {
      console.error(`Error verifying JWT: ${error.message}`);
      return res.status(401).json({ auth: false, message: "Failed to authenticate token."});
    }

    req.userId = decoded.userId;
    next();
  })
};