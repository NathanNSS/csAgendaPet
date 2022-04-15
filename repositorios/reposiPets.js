const query = require('../infraestrutura/database/queries');

class Pets{
    
    adicionar(pet){
        
        const sql = 'INSERT INTO pets SET ?';

        query(sql, pet);
    }

}

module.exports = new Pets();

