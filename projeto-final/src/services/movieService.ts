import { error } from "console";
import IMovie from "../interfaces/movieInterface.js";
import MovieModel from "../models/movieModel.js";
import fileService from "../utils/fileService.js";
import { release } from "os";

class MovieService {
  async getAll() {
    try {
      return await MovieModel.find();
    } catch (error) {
      throw new Error("Failed to get all products");
    }
  }
  async filter(filter: any) {
    try {
      //   if (type === "releaseDate") {
      //     return await MovieModel.find({ releaseDate: filter });
      //   }
      //   if (type === "title") {

      //     return await MovieModel.find({ title: filter });
      //   }
      //   if (type === "genres") {
      //     return await MovieModel.find({ genres: filter });
      //   }

      return await MovieModel.find({
        $or: [{ title: filter }, { genres: filter }, { releaseDate: filter }],
      });
    } catch (error) {
        console.log(error)
      throw new Error("Failed to get products");
    }
  }
  async sort() {
    try {
      return await MovieModel.find().sort({ releaseDate: 1 });
    } catch (error) {
      throw new Error("Failed to get products");
    }
  }
  async create(movieData: IMovie, poster: any) {
    try {
      if (poster) {
        const posterUrl = fileService.save(poster);
        movieData.posterUrl = posterUrl;
      }

      const newMovie = new MovieModel(movieData);
      // await MovieModel.create(movieData) outra forma de criar
      return await newMovie.save();
    } catch (error) {
      throw new Error("Failed to create the movie");
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
      throw new Error("Failed to update product");
    }
  }
  async delete(movieId: string) {
    try {
      const deletedMovie = await MovieModel.findByIdAndDelete(movieId);
      return deletedMovie;
    } catch (error) {
      throw new Error("Failed to update product");
    }
  }
}

export default new MovieService();
