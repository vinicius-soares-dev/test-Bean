import { Request, Response } from "express";
import { Users } from "../entity/Users";
import { randomUUID } from "crypto";
import { AppDataSource } from "../data-source";

export const RegisterUser =  async (req: Request, res: Response) => {
  const {username, password} = req.body;
  const randomId = randomUUID();
  if(username && password) {
    const user = new Users(username, password, randomId);
    const createUser = await AppDataSource.manager.save(user);
    res.status(200).json(createUser);
    return;
  }
  res.status(400).json({ error:  'Username or Password is required' });
  return;
};

