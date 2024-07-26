import { IUser } from "../interfaces/interfaces.js";
import jsonFileReader from "../utils/jsonFileReader.js";
import { v4 as uuidv4 } from "uuid";

const usersJsonPath: string = "./src/data/users.json";

class UserService {
  private readUserJson(): IUser[] | undefined {
    try {
      const data = jsonFileReader.read(usersJsonPath);

      return data;
    } catch (error) {
      throw new Error("Failed to read products from file");
    }
  }
  private writeUserJson(users: IUser[]): void {
    try {
      jsonFileReader.write(usersJsonPath, users);
    } catch (error) {
      throw new Error("Failed to write users on file");
    }
  }

  getAll = () => {
    try {
      const data = this.readUserJson();
      return data;
    } catch (error) {
      throw new Error("Failed to read users from file");
    }
  };
  getUserById = (userId: string): IUser | undefined => {
    try {
      const users: IUser[] | undefined = this.readUserJson();
      const foundUser = users?.find((user) => user.id == userId);
      console.log(users)

      return foundUser;
    } catch (error) {
      console.log(error);
    }
  };
  create = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  update = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  delete = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
}

export default new UserService();
