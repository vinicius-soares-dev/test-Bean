import { Request, Response } from "express";
import { Users } from "../entity/Users";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";

const SECRET_KEY = 'JDSOFJG';

export const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userRepository = AppDataSource.manager.getRepository(Users);
  const existingUser = await userRepository.findOne({ where: { username, password} });

  if (!existingUser) return res.status(401).send("Invalid Credentials");

  const token = jwt.sign({ userId: existingUser.id}, SECRET_KEY, {
    expiresIn: 3600  // 1 hour
  });
  
  return res.json({ auth: true, token: token }); 
}