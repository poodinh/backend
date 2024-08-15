// import {Document} from 'mongoose'; vamos precisar qnd tivermos o mongoose instalada

export default interface IMovie /*extends Document*/ {
  title: string;
  releaseDate: Date;
  trailerLink: string;
  posterUrl: string;
  genres: string[];
}
