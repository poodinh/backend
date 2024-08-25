import { error } from "console";
import IUser from "../interfaces/userInterface.js";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class UserService {
  async getAll() {
    try {
      return await UserModel.find();
    } catch (error) {
      throw new Error("Failed to get all users");
    }
  }
  async register(userInfo: IUser) {
    try {
      const foundUser = await UserModel.findOne({ email: userInfo.email });
      if (foundUser) {
        return null;
      }
      const encriptPass = await bcrypt.hash(userInfo.password, 10);
     
      userInfo.password = encriptPass;

      const newUser = await UserModel.create(userInfo);
      return newUser;
    } catch (error) {
      throw new Error("Failed to find the users");
    }
  }
  async login(email: string, password: string) {
    try {
      const findUser = await UserModel.findOne({ email: email }) as IUser;
      if (!findUser) {
        return null;
      }
      const findPass = await bcrypt.compare(password, findUser.password);
      if (!findPass) {
        return undefined;
      } 
      let token = "";
      if (process.env.SECRET_KEY) {
        token = jwt.sign(
          {
            id: findUser._id,
            email: findUser.email,
            role: findUser.role,
          },
          process.env.SECRET_KEY
        );
      } else {
        throw new Error("Cannot get secret key");
      }
      return {user: findUser, accessToken: token};
    } catch (error) {
      throw new Error("Failed to sort the users");
    }
  }

  async update(userId: string, updates: IUser) {
    try {
      if(updates.password){
        const encriptPass = await bcrypt.hash(updates.password, 10);
        updates.password = encriptPass;
      }
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }
  async delete(userId: string) {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }
}

export default new UserService();
