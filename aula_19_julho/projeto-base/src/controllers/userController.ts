import { Request, Response } from "express";
import { IUser } from "../interfaces/interfaces.js";
import userService from "../services/userService.js";

class UserController {
  getAll = async (req: Request, res: Response) => {
    //o try catch previne que um erro de submissâo de dados n crashe tudo, TEM Q TER SEMPRE
    try {
      const users: IUser[] | undefined = userService.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to get users" });
    }
  };
  getOne = async (req: Request, res: Response) => {
    try {
      const idToFind: string = req.params.id;
      console.log(idToFind)
      const user: IUser | undefined = userService.getUserById(idToFind);
      if(!user){
        res.status(400).json({error: 'User not found'})
      };
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  };
  create = async (req: Request, res: Response) => {
    try {
    } catch (error) {
      res.status(500).json({ error: "Failed to create User" });
    }
  };
  update = async (req: Request, res: Response) => {
    try {
    } catch (error) {
      res.status(500).json({ error: "Failed to update User" });
    }
  };
  delete = async (req: Request, res: Response) => {
    try {
    } catch (error) {
      res.status(500).json({ error: "Failed to delete User" });
    }
  };
}

export default new UserController();