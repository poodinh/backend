import express, { Express } from 'express';

import usersRouter from './routers/userRouter.js';
import productsRouter from './routers/productRouter.js';

const app: Express = express();

app.use(express.json());

app.use(usersRouter);
app.use(productsRouter);

const PORT: number = 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})