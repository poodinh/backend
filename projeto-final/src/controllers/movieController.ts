import { Request, Response, NextFunction } from "express";
import IMovie from "../interfaces/movieInterface.js";
import movieService from "../services/movieService.js";
import { validationResult } from "express-validator";
import { error } from "console";

class MovieController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      
      const movies: IMovie[] = await movieService.getAll();
      res.status(201).json(movies);
    } catch (err) {
        res.status(500).json({ error: "Failed to get all movies" });
    }
  }
  async filter(req: Request, res: Response, next: NextFunction) {
    try {
        //const typeFilter = req.originalUrl.split('=')[1].split('&')[0]
        const movieFilter = req.originalUrl.split('=')[1].replace(/%20/g, ' ')

        const filteredMovies: IMovie[] | undefined = await movieService.filter( movieFilter);
        res.status(201).json(filteredMovies);
      } catch (err) {
        res.status(500).json({ error: "Failed to filter movies" });
      }
  }
  async sort(req: Request, res: Response, next: NextFunction) {
    try {
        const sortedMovies: IMovie[] = await movieService.sort();
      res.status(201).json(sortedMovies);
      } catch (err) {
        res.status(500).json({ error: "Failed to sort movies" });
      }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        let allErrors = [];
        for (let i = 0; i < errorsArray.length; i++) {
          const msg = errorsArray[i].msg;
          allErrors.push(msg);
        }
        if(allErrors.length==1){
            return res.status(422).json({ error: allErrors })
        }
        return res.status(422).json({ errors: allErrors });
      }
      const { title, releaseDate, trailerLink, genres } = req.body;
      const poster = req.files?.poster;
      const movieData = {
        title,
        releaseDate,
        trailerLink,
        genres,
      } as IMovie;

      const createdMovie = await movieService.create(movieData, poster);

      res.status(201).json(createdMovie);
    } catch (error) {
      res.status(500).json({ error: "Failed to create movie" });
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = req.params.id;
      const updates = req.body;
      const updatedMovie = await movieService.update(movieId, updates);
      if(!updatedMovie){
        return res.status(404).json({ error: "Movie doesn't exist in the database" });
    }
      res.status(201).json(updatedMovie);
    } catch (error) {
      res.status(500).json({ error: "Failed to update movie" });
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
        const movieId = req.params.id;
        const deletedMovie = await movieService.delete(movieId);
        if(!deletedMovie){
            return res.status(404).json({ error: "Movie already doesn't exist in the database" });
        }
        res.json(deletedMovie);
      } catch (error) {
        res.status(500).json({ error: "Failed to update movie" });
      }
  }
}

export default new MovieController();
