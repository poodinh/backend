import express, { Express, Request, Response } from "express";

const app: Express = express(); //criar a aplicação chamando a expressão express

app.use(express.json()) //a função sabe usar json

//n há diferença entre type e interface. o alex prefere o interface para objetos e cenas maiores
interface IUser {
	id: number;
	name: string;
	email: string;
	password?: string; //o ponto de interrogação significa q n é obrigatório
}

//criar array de users

let users: IUser[] = [
	{
		id: 1,
		name: 'Pedro',
		email: 'pedro@sapo.pt'
	},
	{
		id: 2,
		name: 'Ivan',
		email: 'ivan@sapo.pt'
	}
];

// Get all users
app.get('/users', (req: Request, res: Response) => {
	// console.log("Request method", req.method);
	// console.log("Request URL", req.originalUrl);
	// console.log("Query Parameter", req.query); //para enchermos os parametros podemos adicionara à frente do url no postman ?role=admin e adiciona um role admin

	//Não se envia lista vazias, por isso convém fazer sempre este check para garantir que n é enviado
	if (users.length === 0) {
		req.statusMessage = 'No Users found';
		res.sendStatus(204); // os cenas dos status 204, 404 tem no mdn web docs https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
	} //usa-se a negação para se evitar ter elses
	res.json(users);

});

// Get users by id
app.get('/users/:id', (req: Request, res: Response) => {
	//console.log(req.params) //faz request dos parametros. No postman se se fizer /1 vai-nos devolver o user com id 1 aqui na consola
	const userId: number = parseInt(req.params.id) //conseguimos o id. Temos q fazer parseInt para garantir q é nr

	const foundUser: IUser | undefined = users.find(user => user.id === userId); //se n encontrar vai ser undefined e tem q estar definido isso

	if (!foundUser) {
		res.status(404).json({ error: 'User not found!' }) //Para caso o user não exista dá o erro 404 e põe a mensagem do erro
	}
	res.json(foundUser)

});

//create new user. tem de ser post para enviar os dados
app.post('/users', (req: Request, res: Response) => {
	console.log("Request Body", req.body) //mostra o q queremos criar no postman para enviar para aqui

	const newUser: IUser = {
		id: users.length + 1,
		name: req.body.name,
		email: req.body.email
	}
	users.push(newUser);
	//o status 201 dá o ok e significa q o novo resource foi criado 
	res.status(201).json(newUser); //quando é criada uma cena o que é enviado para o frontend é aquilo que nós criamos
});

//update user by id
app.put('/users/:id', (req: Request, res: Response) => {
	const userId: number = parseInt(req.params.id)

	const foundUser: IUser | undefined = users.find(user => user.id === userId);

	console.log(foundUser)
	if (!foundUser) {
		res.status(404).json({ error: 'User not found!' })
	} else {
		foundUser.name = req.body.name;
		foundUser.email = req.body.email;
		foundUser.password = req.body.password;
	}
	res.json(foundUser);
});

//delete user
app.delete('/users/:id', (req: Request, res: Response) => {
	const userId: number = parseInt(req.params.id)

	const foundUser: IUser | undefined = users.find(user => user.id === userId);

	console.log(foundUser)
	if (!foundUser) {
		res.status(404).json({ error: 'User not found!' })
	} else {
		const index: number = users.indexOf(foundUser);
		users.splice(index, 1); // como o foundUser pode ser undefined tem que estar dentro do else, não aceita fora
	}

	//users=users.filter(user=> user.id!== userId) forma que o Alex fez

	res.json(users);
});

//pesquisa pelo nome tpc


//cenas das ports do node fundamentals
const PORT: number = 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})