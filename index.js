const customExpress = require('./config/customExpress.js');
const conexao = require('./infraestrutura/database/conexao');
const Tabelas = require('./infraestrutura/database/tabelas.js');

conexao.connect( erro =>{
    if(erro){

        console.log(erro);

    }else{

        console.log('Banco de Dados Conectado :)');
        
        Tabelas.init(conexao);
        const app = customExpress();
        
        let port = 3000;     
        app.listen(port, () => console.log(`Servidor Rodando na porta ${port} :)`));
    }
})

