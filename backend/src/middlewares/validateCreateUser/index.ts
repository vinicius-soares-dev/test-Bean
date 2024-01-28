import { Request, Response, NextFunction } from "express";
import { Users } from "../../entity/Users";
import { AppDataSource } from "../../data-source";

export function validateUsernameMiddleware(req: Request, res: Response, next: NextFunction) {
  const { username } = req.body;
  if (!username || (typeof username !== 'string' || username.length <= 6)) {
    return res.status(400).json({ error: "Invalid username. Username must be a string with length greater than 6." });
  }
  next();
};

export function validatePasswordMiddleware(req: Request, res: Response, next: NextFunction){
  const { password } = req.body;
  if(!password || (typeof password !== 'string' || password.length >= 8)) {
    return res.status(400).json({ error: "Invalid password. Password must be a string with length greater than 8" })
  }

  next();
};

export async function validateUserExistenceMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { username } = req.body;
    const userRepositoty = AppDataSource.manager.getRepository(Users);
    const existingUser = await userRepositoty.findOne({ where: { username }});
  
    if(existingUser) {
      return res.status(400).json({ error: "User  already exists." });
    }
    next();
  } catch (error) {
    console.error(`Error validating user existence: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}