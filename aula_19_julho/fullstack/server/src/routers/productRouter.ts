import { Router } from 'express';
import ProductController from '../controllers/productController.js';
import { check } from 'express-validator'; //a função check traz todas as validações que queremos realizar

const router: Router = Router();
//o router recebe os dados do user e vai buscar a info ao controller

const validateProduct = [
    check("name").notEmpty().withMessage("Product name is required"),
    check("description").notEmpty().withMessage("Product description is required"),
    check("price").isNumeric().withMessage("Price must be an number"),
    check("ean").optional().isLength({min:13, max:13}).withMessage("EAN must be 13 digits long"),
]; //constante para validar o produto

// Get all products
router.get('/products', ProductController.getAll);

// Get product by ID
router.get('/products/:id', ProductController.getOne);

// Create a new product
router.post('/products', validateProduct, ProductController.create);

// Update an existing product
router.put('/products/:id', ProductController.update);

// Delete an existing product
router.delete('/products/:id', ProductController.delete);

export default router;