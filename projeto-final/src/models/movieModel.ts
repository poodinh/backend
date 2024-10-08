import IMovie from "../interfaces/movieInterface.js";
import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema<IMovie>({
    title: {
        type: String,
        required: true
    },
    releaseDate:{
        type: String,
        required: true
    },
    trailerLink:{
        type: String,
        required: true
    },
    posterUrl:{
        type: String,
        default: 'no-image.png'
    },
    genres: {
        type: [String],
        required: true
    },
    ratings:{
        type: Object,
        default: {}
    }
})

const MovieModel = mongoose.model<IMovie>('Movie', MovieSchema)

export default MovieModel