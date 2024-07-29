import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { IProduct } from '../interfaces/interfaces.js';
import productService from '../services/productService.js';

//o controller recebe o request e vai manda-lo para o service para ele o tratar, o service envia-o de volta para o controller e este envia a response
// o controller trata só dos pedidos e das respostas, recebe as cenas do service e manda
class ProductController {
  getAll = async (req: Request, res: Response) => {
    //o try catch previne que um erro de submissâo de dados n crashe tudo, TEM Q TER SEMPRE 
    try{
      const products: IProduct[] | undefined = productService.getAll();
      
      res.json(products)
    }catch(error){
      res.status(500).json({error: 'Failed to get products'})
    }
  }
  getOne = async (req: Request, res: Response) => {
    try{
      const productId: string = req.params.id; // vai buscar o product id aos parametros do request
      const product: IProduct | undefined = productService.getProductById(productId); //executa a função do service

      if(!product){
        res.status(404).json({error: 'Product not found'})
      }
      res.json(product) //se no postman tiver sempre a carregar é pq falta o return
    }catch(error){
      res.status(500).json({error: 'Failed to get product'});
    }
  }
  create = async (req: Request, res: Response) => {
    try{
      const errors = validationResult(req); //chamar a validação 
      if (!errors.isEmpty()){
        res.status(400).json({ errors: errors.array()})
      } //se o array de erros n tiver vazio quer dizer q tem erros e vai enviar os erros para lá
      const productToCreate: IProduct = req.body; //body é o que recebe os dados para publicar
      const createdProduct: IProduct | undefined= productService.create(productToCreate);
      res.status(201).json(createdProduct);
    }catch(error){
      res.status(500).json({error: 'Failed to create product'});
    }
  }
  update = async (req: Request, res: Response) => {
    try{
      
      const productId: string = req.params.id;
      const productToUpdate: IProduct= req.body;
      const updatedProduct: IProduct| undefined= productService.update(productId,productToUpdate);
      if(!updatedProduct){
        res.status(404).json({error: 'Product not found'})
      }
      res.json(updatedProduct);
    }catch(error){
      res.status(500).json({error: 'Failed to update product'});
    }
  }
  delete = async (req: Request, res: Response) => {
    try{
      const productId: string = req.params.id;
      const deletedProduct:IProduct|undefined = productService.delete(productId);
      
      if(!deletedProduct){
        res.status(404).json({error: 'Product not found'})
      }
      res.json(deletedProduct)
    }catch(error){
      res.status(500).json({error: 'Failed to delete product'});
    }
  }
}

export default new ProductController();