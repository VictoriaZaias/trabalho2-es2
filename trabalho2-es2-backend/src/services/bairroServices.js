const database = require('../database/dbConfig');

const buscarBairro = (idBairro) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM bairro WHERE bairro.idBairro = ?', [idBairro], (error, results) =>{
            if (error) { rejeitado(error); return; }
            if (results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
}

const inserirBairro = (bairro) => {
    return new Promise((aceito, rejeitado) => {
        database.query('INSERT INTO bairro (bairro) VALUES (?)', [bairro], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results.insertId);
        });
    });
}

const buscarIdBairro = (bairro) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM bairro WHERE bairro = ?', [bairro], (error, results) =>{
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
    buscarBairro,
    inserirBairro,
    buscarIdBairro,
};