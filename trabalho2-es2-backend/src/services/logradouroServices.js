const database = require('../database/dbConfig');

const buscarLogradouro = (idLogradouro) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM logradouro WHERE logradouro.idLogradouro = ?', [idLogradouro], (error, results) =>{
            if (error) { rejeitado(error); return; }
            if (results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
}

const inserirLogradouro = (logradouro, idTipoLogradouro) => {
    return new Promise((aceito, rejeitado) => {
        database.query('INSERT INTO logradouro (logradouro, TipoLogradouro_idTipoLogradouro) VALUES (?, ?)', [logradouro, idTipoLogradouro], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results.insertId);
        });
    });
}

const buscarIdLogradouro = (logradouro) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM logradouro WHERE logradouro = ?', [logradouro], (error, results) =>{
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
    buscarLogradouro,
    inserirLogradouro,
    buscarIdLogradouro,
};