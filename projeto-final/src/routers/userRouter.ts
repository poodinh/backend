import { Router } from "express";
import UserController from "../controllers/userController.js";
import { check } from "express-validator";
import { checkRole } from "../middlewares/authMiddleware.js";

const router: Router = Router();

const validateUser = [
  check("name").notEmpty().withMessage("User name is required"),
  check("email").isEmail().withMessage("Invalid email format"),
  check("password").isStrongPassword().withMessage("Password not strong enough"),
  check("role").isIn(["USER", "ADMIN"]).withMessage("Invalid role"),
];

const validateLogin = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password").notEmpty().withMessage("Password is required"),
];

router.get("/users", checkRole(["ADMIN"]), UserController.getAll);
router.post("/users/register", validateUser, UserController.register);
router.post("/users/login", validateLogin, UserController.login);
router.put("/users/:id", checkRole(["ADMIN"]), UserController.update);
router.delete("/user/:id", checkRole(["ADMIN"]), UserController.delete);

export default router;
