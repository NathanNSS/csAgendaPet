const fs = require('fs');
const path = require('path');

//Modo sicrono
// fs.readFile('./assets/cappuccino.png',(erro, buffer) =>{
//     console.log(erro);
//     console.log(buffer);
//     console.log('imagem bufferizada');
    
//     fs.writeFile('./assets/cappuccino2.png', buffer, erro => {
//         console.log(`imagem bufferizada`);
//     });
// }); 

module.exports = (caminho, nomeDoArquivo, callBackImgCriada) => {

    const tipo = path.extname(caminho);
    const tiposValidos = ['png', 'jpg', 'jpeg'];
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1;

    if(tipoEhValido){

        const novoCaminho = `./assets/img/${nomeDoArquivo}${tipo}`;

        //Modo Assicrono
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callBackImgCriada(false, novoCaminho));

    }else{

        const erro = "Tipo Invalido de Arquivo !!";
        callBackImgCriada(erro,false); 

    }
}
