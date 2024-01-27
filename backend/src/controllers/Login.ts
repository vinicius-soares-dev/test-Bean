import { Request, Response } from "express";
import { Users } from "../entity/Users";
import { AppDataSource } from "../data-source";

export const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const credentialsDatabase = AppDataSource.manager.getRepository(Users);
  const existingUser = await credentialsDatabase.findOne({ where: { username } && { password }});
  if (!existingUser) return res.status(401).send("Invalid Credentials");
  return  res.status(200).redirect("/pokemon");
}