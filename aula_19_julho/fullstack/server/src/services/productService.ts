import { IProduct } from '../interfaces/interfaces.js';
import jsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';

const productsJsonPath: string = './src/data/products.json'

// ???? acho que aqui criamos as funções base e depois no controler vai usar estas funções pros requests
//trata da lógica do api, vai a base de dados, faz calculos, gerar passwords ou ids e manda para o controlador
class ProductService {
    //ao chamar a função ela retorna todos os produtos do jSon
    //como é private só é chamada dentro do nosso serviço
    private readProductJson(): IProduct[] | undefined {
        try {

            const data = jsonFileReader.read(productsJsonPath);

            return data
        } catch (error) {
            throw new Error('Failed to read products from file')
        }
    };
    private writeProductJson(products: IProduct[]): void {
        try {
            jsonFileReader.write(productsJsonPath, products);
        } catch (error) {
            throw new Error('Failed to write products on file')
        }
    };

    getAll = (): IProduct[] | undefined => {
        //o try catch previne que um erro de submissâo de dados n crashe tudo, TEM Q TER SEMPRE 
        try {
            const products: IProduct[] | undefined = this.readProductJson();

            return products;

        } catch (error) {
            throw new Error('Failed to get all products');
        }
    }
    getProductById = (productId: string): IProduct | undefined => {
        //n tem chavetas no IProduct porque aqui recebemos só um produto e não um array de produtos
        try {
            const products: IProduct[] | undefined = this.readProductJson();

            const foundProduct = products?.find(product => product.id === productId);
            //o ? é que ele pode não encontrar
            return foundProduct;

        } catch (error) {
            throw new Error('Failed to get product by ID');
        }
    }
    create = (newProduct: IProduct): IProduct => {
        try {
            const products: IProduct[] | undefined = this.readProductJson();
            if (!products) {
                throw new Error('Failed to read products')
            };

            newProduct.id = uuidv4();
            products?.push(newProduct);

            this.writeProductJson(products); //vai substituir o que tem na base 
            return newProduct;
        } catch (error) {
            throw new Error('Failed to create product')
        }
    }
    update = (productId: string, product: IProduct): IProduct | undefined => {
        try {
            const products = this.readProductJson();
            if (!products) {
                throw new Error('Failed to read products');
            }

            const productIndex: number = products.findIndex(product => product.id === productId);

            if (productIndex === -1) {
                return undefined;;
            }
            const productToUpdateWithId = { ...products[productIndex], ...product } //merge product with id
            products[productIndex] = productToUpdateWithId;

            this.writeProductJson(products);
            return productToUpdateWithId

        } catch (error) {
            throw new Error('Failed to update product');
        }
    }
    delete = (productId: string): IProduct | undefined => {
        try {
            const products = this.readProductJson();
            if (!products) {
                throw new Error('Failed to read products');
            }

            const productIndex: number = products.findIndex(product => product.id === productId);

            if (productIndex === -1) {
                return undefined; //se lançarmos o err aqui ele vai capturar no controller como catch e vai devolver o erro 500 
            }

            const deletedProduct = products.splice(productIndex,1)[0] // o [0] faz com que devolva o produto apagado
            
            this.writeProductJson(products);

            return deletedProduct
        } catch (error) {
            throw new Error('Failed to delete product');
        }
    }
}

export default new ProductService();