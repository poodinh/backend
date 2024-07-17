//biblioteca para criar pastas ou ficheiros

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; //retira o file::

const dirname = path.dirname(fileURLToPath(import.meta.url))

console.log(dirname);

//criar pastas
fs.mkdirSync(path.resolve(dirname, 'pasta1')); 

fs.mkdirSync(path.resolve(dirname, 'folder1' , 'folder2', 'folder3'), {recursive:true}); 
//só permite com o recursive que vai permitir criar pastas dentro de pastas

//teste git


//fs.mkdirSync(path.resolve(dirname, 'lixo')); 
//apaga a pasta (remove)
fs.rmdirSync(path.resolve(dirname, 'lixo'));



