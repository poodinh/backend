import { IProduct } from '../models/productModel.js';
// import JsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';
import ProductModel from '../models/productModel.js';

// const productsJsonPath: string = './src/data/products.json';

class ProductService {
  // private readProductsJson(): IProduct[] | undefined {
  //   try {
  //     const data = JsonFileReader.read(productsJsonPath);
  //     return data;
  //   } catch (error) {
  //     throw new Error('Failed to read products from file');
  //   }
  // }

  // private writeProductsJson(products: IProduct[]): void {
  //   try {
  //     JsonFileReader.write(productsJsonPath, products);
  //   } catch (error) {
  //     throw new Error('Failed to write products to file');
  //   }
  // }

  getAll = async (): Promise<IProduct[]> => {
    try {
      return await ProductModel.find();
    } catch (error) {
      throw new Error('Failed to get all products');
    }
  }

  getProductById = async (productId: string): Promise<IProduct | null> => {
    try {
      const foundProduct: IProduct | null = await ProductModel.findById(productId);

      return foundProduct;
    } catch (error) {
      throw new Error('Failed to get product by ID');
    }
  }

  create = async (newProduct: IProduct): Promise<IProduct> => {
    try {
      const createdProduct = await ProductModel.create(newProduct);
      console.log(createdProduct)
      return createdProduct;
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }

  update = async (productId: string, product: IProduct): Promise<IProduct | null> => {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(productId, product, { new: true });

      return updatedProduct;
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }
  delete = async (productId: string): Promise<IProduct | null> => {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(productId); // Delete product
      return deletedProduct;
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }
}

export default new ProductService();