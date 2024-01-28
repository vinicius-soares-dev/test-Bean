import { Request, Response } from "express";
import { Users } from "../entity/Users";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";

export const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const credentialsDatabase = AppDataSource.manager.getRepository(Users);
  const existingUser = await credentialsDatabase.findOne({ where: { username } && { password }});
  if (!existingUser) return res.status(401).send("Invalid Credentials");
  const token = jwt.sign({ userId: existingUser.id}, 'JDSOFJG', {
    expiresIn: 300 * 300
  });
  return res.json({ auth: true, token: token }); 
}