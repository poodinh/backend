import { Router } from "express";
import MovieController from "../controllers/movieController.js";
import { check } from "express-validator";
import MovieModel from '../models/movieModel.js'

const router: Router = Router();

const validateMovie = [
    check('title').notEmpty().withMessage("Movie title is required"),
    check('releaseDate').isDate().withMessage("Movie release date is required"),
    check('trailerLink').notEmpty().withMessage("Movie trailer is required"),
    check('genres').notEmpty().withMessage("Movie genres are required"),
    check('title').custom(async (value, {req}) =>{
        const repeatedMovie = await MovieModel.findOne({title: req.body.title});
        
        if( repeatedMovie){
            throw new Error ('Movie already in database')
        }}
    )

]

router.get("/movies", MovieController.getAll);
router.get("/movies/search*", MovieController.filter);
router.get("/movies/sortby*", MovieController.sort);
router.post("/movies/", validateMovie, MovieController.create);
router.put("/movies/:id", MovieController.update);
router.delete("/movies/:id", MovieController.delete);


export default router;
