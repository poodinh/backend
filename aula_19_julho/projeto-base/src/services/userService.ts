import { IUser } from '../interfaces/interfaces.js';
import jsonFileReader from '../utils/jsonFileReader.js';
import{v4 as uuidv4} from 'uuid';

const usersJsonPath: string = './src/data/users.json'

class UserService {

    private readUserJson(): IUser[] | undefined {
        try {

            const data = jsonFileReader.read(usersJsonPath);

            return data
        } catch (error) {
            throw new Error('Failed to read products from file')
        }
    };
    private writeUserJson(users: IUser[]): void {
        try {
            jsonFileReader.write(usersJsonPath, users);
        } catch (error) {
            throw new Error('Failed to write users on file')
        }
    };

    getAll = (): IUser[] | undefined => {
        
        try {
            const users: IUser[] | undefined = this.readUserJson();

            return users;

        } catch (error) {
            throw new Error('Failed to get all users');
        }
    }
    getUserById = (userId: string): IUser | undefined => {
        
        try {
            const users: IUser[] | undefined = this.readUserJson();

            const founduser = users?.find(user => user.id === userId);
      
            return founduser;

        } catch (error) {
            throw new Error('Failed to get user by ID');
        }
    }
    create =  (newUser: IUser): IUser  => {
        try {
            const users: IUser[] |undefined= this.readUserJson();
            if(!users){
                throw new Error('Failed to read users')
            };

            newUser.id = uuidv4();
            users?.push(newUser);

            this.writeUserJson(users); 
            return newUser;
        } catch (error) {
            throw new Error('Failed to create user')
        }
    }
    update = () => {
        try {

        } catch (error) {
            console.log(error);
        }
    }
    delete = () => {
        try {

        } catch (error) {
            console.log(error);
        }
    }
}

export default new UserService();