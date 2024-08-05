import { Router } from 'express';
import { check } from 'express-validator';
import UserController from '../controllers/userController.js';

const router: Router = Router();

// Get all users
router.get('/users', UserController.getAll);

// Get user by ID
router.get('/users/:id', UserController.getOne);

// Register a new user
router.post('/users', [
    check('name').notEmpty().withMessage("Name is required"),
    check('email').isEmail().withMessage("InvalidEmailFormat"),
    check('password').isStrongPassword(),
    check('role').isIn(["USER", "ADMIN", "GUEST"]).withMessage("Invalid role")
], UserController.register);

// Login
router.post('/users', [
    check('email').isEmail().withMessage("InvalidEmailFormat"),
    check('password').notEmpty().withMessage("Password is required")
], () => { })

// Update an existing user
router.put('/users/:id', UserController.update);

// Delete an existing user
router.delete('/users/:id', UserController.delete);

export default router;