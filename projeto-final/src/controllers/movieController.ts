import { Request, Response, NextFunction } from "express";
import IMovie from "../interfaces/movieInterface.js";
import movieService from "../services/movieService.js";
import { validationResult } from "express-validator";
import { error } from "console";
import { checkID } from "../middlewares/authMiddleware.js";

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
      const querySent: {} = req.query;
      const movieFilter = Object.values(querySent)[0] as string;
      const filteredMovies: IMovie[] | undefined =
        await movieService.filter(movieFilter);
      if (filteredMovies.length == 0) {
        res.status(404).json({ error: "Movie not found" });
      } else {
        res.status(201).json(filteredMovies);
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to find the movies" });
    }
  }
  async sort(req: Request, res: Response, next: NextFunction) {
    try {
      const sortingOrder: {} = req.query;

      const sortedMovies: IMovie[] | undefined | null =
        await movieService.sort(sortingOrder);
      if (sortedMovies === null) {
        res.status(400).json({ error: "Key of the sorting type is incorrect" });
      } else if (sortedMovies === undefined) {
        res
          .status(400)
          .json({ error: "Value of the sorting category is incorret" });
      } else {
        res.status(201).json(sortedMovies);
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to sort movies" });
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
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
      const { title, releaseDate, trailerLink, genres } = req.body;
      const poster = req.files?.poster;
      const movieData = {
        title,
        releaseDate,
        trailerLink,
        genres,
      } as IMovie;

      const createdMovie = await movieService.create(movieData, poster);
      if (createdMovie === null) {
        res.status(422).json({ error: "Movie already exists in the database" });
      } else {
        res.status(201).json(createdMovie);
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to create movie" });
    }
  }
  async rate(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = req.params.id;
      const rating = req.body;
      const updatedMovie = await movieService.rate(movieId, rating);
      if (updatedMovie === 1) {
        return res
          .status(400)
          .json({ error: "Invalid rate, must be between 1 and 5" });
      }
      if (updatedMovie === 2) {
        return res.status(404).json({ error: "Invalid user ID" });
      }
      if (updatedMovie === 3) {
        return res
          .status(404)
          .json({ error: "Movie doesn't exist in the database" });
      }
      res.status(201).json(updatedMovie);
    } catch (err) {
      res.status(500).json({ error: "Failed to update movie" });
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = req.params.id;
      const updates = req.body;
      const updatedMovie = await movieService.update(movieId, updates);
      if (!updatedMovie) {
        return res
          .status(404)
          .json({ error: "Movie doesn't exist in the database" });
      }
      res.status(201).json(updatedMovie);
    } catch (err) {
      res.status(500).json({ error: "Failed to update movie" });
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = req.params.id;
      const deletedMovie = await movieService.delete(movieId);
      if (!deletedMovie) {
        return res
          .status(404)
          .json({ error: "Movie doesn't exist in the database" });
      }
      res.json(deletedMovie);
    } catch (err) {
      res.status(500).json({ error: "Failed to delete movie" });
    }
  }
}

export default new MovieController();
