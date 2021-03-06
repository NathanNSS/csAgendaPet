const query = require('../infraestrutura/database/queries');

class Atendimento {
    adiciona(params){

        const sql = "INSERT INTO Atendimentos SET ?";
        return query(sql, params);
    }
    listar(){

        const sql = "SELECT * FROM Atendimentos";
        return query(sql);
    }
    
    buscarPorId(params){

        const id = params;
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        return query(sql);
    }

    alterar(valores, id){
        
        const sql = "UPDATE Atendimentos SET ? WHERE id=?";

        return query(sql,[valores, id]);
    }

    deletar(id){

        const sql = "DELETE FROM Atendimentos WHERE id=?";

        return query(sql, id);
    }
}

module.exports = new Atendimento()