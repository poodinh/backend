import {Document} from 'mongoose'; 

export default interface IMovie extends Document {
  title: string;
  releaseDate: string;
  trailerLink: string;
  posterUrl: string;
  genres: string[];
  ratings: object;
}
