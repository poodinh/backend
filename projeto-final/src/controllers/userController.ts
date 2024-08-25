import { Request, Response, NextFunction } from "express";
import IUser from "../interfaces/userInterface.js";
import userService from "../services/userService.js";
import { validationResult } from "express-validator";
import { error } from "console";

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users: IUser[] = await userService.getAll();
      res.status(201).json(users);
    } catch (err) {
      res.status(500).json({ error: "Failed to get all users" });
    }
  }
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        // changing the error format so it only appears the message
        let allErrors = [];
        for (let i = 0; i < errorsArray.length; i++) {
          const msg = errorsArray[i].msg;
          allErrors.push(msg);
        }
        if (allErrors.length == 1) {
          return res.status(422).json({ error: allErrors });
        }
        return res.status(422).json({ errors: allErrors });
      }
      const { name, email, password, role } = req.body;
      const userInfo = {
        name,
        email,
        password,
        role,
      } as IUser;
      const registeredUser = await userService.register(userInfo);
      if (registeredUser === null) {
        res.status(422).json({ error: "Email already in use" });
      } else {
        res.status(201).json(registeredUser);
      }
    } catch {
      res.status(500).json({ error: "Failed to create user" });
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        // changing the error format so it only appears the message
        let allErrors = [];
        for (let i = 0; i < errorsArray.length; i++) {
          const msg = errorsArray[i].msg;
          allErrors.push(msg);
        }
        if (allErrors.length == 1) {
          return res.status(422).json({ error: allErrors });
        }
        return res.status(422).json({ errors: allErrors });
      }
      const { email, password } = req.body;

      const foundUserWithToken = await userService.login(email, password);
      if (foundUserWithToken === null) {
        return res.status(404).json({ error: "Invalid email" });
      }
      if (foundUserWithToken === undefined) {
        return res.status(404).json({ error: "Invalid password" });
      }

      res.json(foundUserWithToken);
    } catch {
      res.status(500).json({ error: "Failed to create user" });
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const updates = req.body;
      const updatedUser = await userService.update(userId, updates);
      if (!updatedUser) {
        return res
          .status(404)
          .json({ error: "User doesn't exist in the database" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const deletedUser = await userService.delete(userId);
      if (!deletedUser) {
        return res
          .status(404)
          .json({ error: "User doesn't exist in the database" });
      }
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }
}

export default new UserController();
