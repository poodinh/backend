import { Router } from "express";
import MovieController from "../controllers/movieController.js";
import { check } from "express-validator";
import MovieModel from '../models/movieModel.js'
import { checkRole } from "../middlewares/authMiddleware.js";

const router: Router = Router();

const validateMovie = [
    check('title').notEmpty().withMessage("Movie title is required"),
    check('releaseDate').isDate().withMessage("Movie release date is required"),
    check('trailerLink').notEmpty().withMessage("Movie trailer is required"),
    check('genres').notEmpty().withMessage("Movie genres are required"),
    checkRole(["ADMIN"])
]

router.get("/movies", checkRole(["ADMIN", "USER"]), MovieController.getAll);
router.get("/movies/search*", checkRole(["ADMIN", "USER"]), MovieController.filter);
router.get("/movies/sortby*", checkRole(["ADMIN", "USER"]), MovieController.sort);
router.post("/movies", validateMovie, MovieController.create);
router.post("/movies/:id", checkRole(["ADMIN", "USER"]), MovieController.rate);
router.put("/movies/:id", checkRole(["ADMIN"]), MovieController.update);
router.delete("/movie/:id", checkRole(["ADMIN"]), MovieController.delete);


export default router;
