//Criar biblioteca nativa

import http from 'http'
import dotenv from 'dotenv'; 

dotenv.config() //para se poder usar as variaveis do .env
//o ficheiro .env tem que estar sempre no .git ignore, vai ter cenas que n podem ser partilhadas com outras pessoas

//o servido precisa de portas para correr e comunicar

//process.env.PORT=5000; se n tiver o npm i cross dev
//as variaveis que costumam ser sempre usadas costumam ser em capslock tipo o PORT do .env
const port = process.env.PORT || 5000; //o env significa variaveis de environment que podem ser em qq parte do nosso codigo
//o || 5000 vai ser um backup para caso n haja uma port declarada vai usar a 5000

//req é o request q o frontend pediu para o backend
//res é o response q o backend dá ao frontend
// const server = http.createServer((req,res) => {
//     res.writeHead(200,{'Content-Type': 'text/html'}); //o 200 é o estado da resposta (status code) e quer dizer q está tudo bem e que o formato da resposta é um html
//     res.end('<h1>Hello, World</h1> <button> Button </button>')
// }) ;

const server = http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type': 'application/json'});
    console.log(req.url);

    if(req.url === '/users'){ //este url chama-se endpoint pois é o ponto de fim do url
        res.end(JSON.stringify([{name: 'John Doe'},{name: 'Alex Doe'}])); // o stringify pega no json e converte numa string
    };

    if(req.url === '/products'){
        res.end(JSON.stringify([{product: 'iPhone 15'},{product: 'Samsung Galaxy S21'}])); 
    };

    req.end('Route not found');
}) ;


server.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
});
//pode-se instalar uma biblioteca para os ports  npm i cross-env
//vai permitir no start do package por cross-env port = 5000 (a variável já vai estar pré definida)
//isto pode fazer com que hajam 100000 variaveis no start
//para n se ter 100000 variaveis no package pode-se fazer npm i dotenv e um ficheiro .env e poe-se la as variaveis