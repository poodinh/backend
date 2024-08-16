import IMovie from '../interfaces/movieInterface.js';
import MovieModel from '../models/movieModel.js'
import fileService from '../utils/fileService.js';

class MovieService {
    async getAll() {}
    async getOne() {}
    async create(movieData: IMovie, poster:any) {
        try{

            if(poster){
                const posterUrl = fileService.save(poster);
                movieData.posterUrl= posterUrl;
            }

            const newMovie= new MovieModel(movieData);
            // await MovieModel.create(movieData) outra forma de criar
            return await newMovie.save()
        } catch(err){
            console.log(err);
        }
    }
    async update() {}
    async delete() {}
}

export default new MovieService();