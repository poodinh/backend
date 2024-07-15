//trabalhar com biblioteca com caminhos para andar de um lado para o outro entre pastas

import path from 'path';

// com o type common js
//const path = require(path);

console.log(import.meta.url);

const dirname = path.dirname(import.meta.url);

console.log(dirname);

console.log(path.join(dirname, '..', 'pasta1')); //muda a pasta ????

console.log(path.resolve('pasta1', 'pasta2', 'ficheiro.js'));  //adiciona o caminho ?????

//a diferença entre um caminho absoluto e um relativo, um absoluto começa sempre da raiz, o relativo vai desde a pasta onde está

console.log(path.isAbsolute('pasta1/pasta2/ficheiro.js')); //false - é relativo

console.log(path.isAbsolute('/pasta1/pasta2/ficheiro.js')); //true

console.log(path.basename('/pasta1/pasta2/ficheiro.js')); //retorna o nome do ficheiro

console.log(path.extname('/pasta1/pasta2/ficheiro.js')); //retorna o tipo do ficheiro