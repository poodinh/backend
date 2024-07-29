import express, { Express } from 'express';
import cors from 'cors';
import usersRouter from './routers/userRouter.js';
import productsRouter from './routers/productRouter.js';
import dotenv from 'dotenv'; //para ir buscar as infos ao .env
import mongoose from 'mongoose';

const app: Express = express();

dotenv.config()

app.use(express.json());
app.use(cors());
app.use(usersRouter);
app.use(productsRouter);

const PORT = process.env.PORT || 3000; //process.env para ir buscar a variável 



//sempre que se trabalha com base de dados trabalha-se de forma assincrona

const startApp = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI || "")
		console.log("Connected to db")

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		})
	} catch (error) {
		console.log(error)
	}
}
startApp();