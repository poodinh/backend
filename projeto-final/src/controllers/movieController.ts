import {Request, Response, NextFunction} from 'express'
import IMovie from '../interfaces/movieInterface.js';

class MovieController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try{
            const movies= req.body
        res.status(201).json(movies)
        } catch (err){
            console.log(err);
        }
    }
    async getOne(req: Request, res: Response, next: NextFunction) {}
    async create(req: Request, res: Response, next: NextFunction) {
        try{
            const {title, releaseDate, trailerLink, posterUrl, genres} = req.body;

            const newMovie : IMovie ={
                title,
                releaseDate,
                trailerLink,
                posterUrl,
                genres
            }

            const createdMovie = newMovie; //é pra fazer algo aqui para por na database acho eu 

            res.status(201).json(createdMovie);
        } catch(err){
            console.log(err);
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {}
    async delete(req: Request, res: Response, next: NextFunction) {}
}

export default new MovieController();