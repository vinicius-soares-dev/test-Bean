import { Request, Response } from "express";
import { Users } from "../entity/Users";
import { randomUUID } from "crypto";
import { AppDataSource } from "../data-source";

export const RegisterUser =  async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if(!username || !password) {
      return res.status(400).json({ error:  'Username and Password are required' });
    }

    const randomId = randomUUID();
    const user = new Users(username, password, randomId);
    const createUser = await AppDataSource.manager.save(user);
    res.status(201).json({ message: 'User succesfully registred', data: createUser.id});
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

