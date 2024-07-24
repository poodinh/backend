import { Request, Response } from 'express';
import { IUser } from '../interfaces/interfaces.js';
import userService from '../services/userService.js';


class UserController {
  getAll = async (req: Request, res: Response) => {
    //o try catch previne que um erro de submissâo de dados n crashe tudo, TEM Q TER SEMPRE 
    try{
      const users: IUser[] | undefined = userService.getAll();
      
      res.json(users)
    }catch(error){
      res.status(500).json({error: 'Failed to get Users'})
    }
  }
  getOne = async (req: Request, res: Response) => {
    try{
      const userId: string = req.params.id; // vai buscar o User id aos parametros do request
      const user: IUser | undefined = userService.getUserById(userId); //executa a função do service

      if(!user){
        res.status(404).json({error: 'User not found'})
      }
      res.json(user) //se no postman tiver sempre a carregar é pq falta o return
    }catch(error){
      res.status(500).json({error: 'Failed to get User'});
    }
  }
  create = async (req: Request, res: Response) => {
    try{
      const userToCreate: IUser = req.body; //body é o que recebe os dados para publicar
      const createdUser: IUser | undefined= userService.create(userToCreate);
      res.status(201).json(createdUser);
    }catch(error){
      res.status(500).json({error: 'Failed to create User'});
    }
  }
  update = async (req: Request, res: Response) => {
    try{

    }catch(error){
      res.status(500).json({error: 'Failed to update User'});
    }
  }
  delete = async (req: Request, res: Response) => {
    try{

    }catch(error){
      res.status(500).json({error: 'Failed to delete User'});
    }
  }
}