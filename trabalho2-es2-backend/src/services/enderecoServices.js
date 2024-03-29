const database = require('../database/dbConfig');

const buscarEndereco = (idEndereco) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM endereco WHERE endereco.idEndereco = ?', [idEndereco], (error, results) =>{
            if (error) { rejeitado(error); return; }
            if (results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
}

module.exports = {
    buscarEndereco,
};