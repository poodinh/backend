import { error } from "console";
import IMovie from "../interfaces/movieInterface.js";
import MovieModel from "../models/movieModel.js";
import fileService from "../utils/fileService.js";
import UserModel from "../models/userModel.js";
import { checkID } from "../middlewares/authMiddleware.js";

class MovieService {
  async getAll() {
    try {
      return await MovieModel.find();
    } catch (error) {
      throw new Error("Failed to get all movies");
    }
  }
  async filter(filter: string) {
    try {
      return await MovieModel.find({
        $or: [
          { title: { $regex: filter, $options: "i" } },
          { genres: { $regex: filter, $options: "i" } },
          { releaseDate: { $regex: filter, $options: "i" } },
        ],
      });
    } catch (error) {
      throw new Error("Failed to find the movies");
    }
  }
  async sort(order: {}) {
    try {
      const sortingType: string | unknown = Object.values(order)[0];
      const sortingCategory: string = Object.keys(order)[0];
      if (
        sortingType != "asc" &&
        sortingType != "ascending" &&
        sortingType != "desc" &&
        sortingType != "descending"
      ) {
        return null;
      } else if (
        sortingCategory != "title" &&
        sortingCategory != "releaseDate"
      ) {
        return undefined;
      } else {
        return await MovieModel.find().sort(order);
      }
    } catch (error) {
      throw new Error("Failed to sort the movies");
    }
  }
  async create(movieData: IMovie, poster: any) {
    try {
      const repeatedMovie = await MovieModel.findOne({
        title: movieData.title,
      });

      if (repeatedMovie) {
        return null;
      }

      if (poster) {
        const posterUrl = fileService.save(poster);
        movieData.posterUrl = posterUrl;
      }

      const newMovie = new MovieModel(movieData);

      return await newMovie.save();
    } catch (error) {
      throw new Error("Failed to create the movie");
    }
  }
  async rate(movieId: string, rating: object) {
    try {
      const userRatingID = Object.keys(rating)[0];
      const rate = Object.values(rating)[0];
      if (rate < 1 || rate > 5) {
        return 1;
      }
      const findUser = await UserModel.findById(userRatingID);
      if (!findUser) {
        return 2;
      }
      const movieToRate = await MovieModel.findById(movieId);
      if (!movieToRate) {
        return 3;
      }
      let ratings: any = movieToRate.ratings;
      ratings[userRatingID] = rate;
      const ratedMovie = await MovieModel.findByIdAndUpdate(
        movieId,
        { ratings: ratings },
        { new: true }
      );

      return ratedMovie;
    } catch (error) {
      throw new Error("Failed to update movie");
    }
  }
  async update(movieId: string, updates: IMovie) {
    try {
      const updatedMovie = await MovieModel.findByIdAndUpdate(
        movieId,
        updates,
        { new: true }
      );
      return updatedMovie;
    } catch (error) {
      throw new Error("Failed to update movie");
    }
  }
  async delete(movieId: string) {
    try {
      const deletedMovie = await MovieModel.findByIdAndDelete(movieId);
      return deletedMovie;
    } catch (error) {
      throw new Error("Failed to delete movie");
    }
  }
}

export default new MovieService();
