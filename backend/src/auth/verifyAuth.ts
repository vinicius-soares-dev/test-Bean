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

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token: string[] | string | undefined = req.headers['x-access-token'] as string | undefined;
  if(!token) return res.status(401).json({ auth: false, message: "No token provided" });
  const SECRET_KEY = 'JDSOFJG';

  jwt.verify(token, SECRET_KEY, function(error: Error | null , decoded: any): any {
    if(error) return res.status(500).json({ auth: false, message: "Failed to authenticate token."});

    req.userId = decoded.indexOf;
    next();
  })
};