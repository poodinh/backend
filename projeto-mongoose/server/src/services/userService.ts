import { IUser } from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../models/userModel.js';


class UserService {
  getAll = async (): Promise<IUser[]> => {
    try {
      return await UserModel.find();
    } catch (error) {
      throw new Error('Failed to get all users');
    }
  }

  getUserById = async (userId: string): Promise<IUser | null> => {
    try {
      const foundUser: IUser | null = await UserModel.findById(userId);

      return foundUser;
    } catch (error) {
      throw new Error('Failed to get user by ID');
    }
  }

  register = async (newUser: IUser): Promise<IUser> => {
    try {
      const createdUser = await UserModel.create(newUser);
      console.log(createdUser)
      return createdUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  update = async (userId: string, user: IUser): Promise<IUser | null> => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, user, { new: true });

      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }
  delete = async (userId: string): Promise<IUser | null> => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(userId); // Delete user
      return deletedUser;
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}

export default new UserService();