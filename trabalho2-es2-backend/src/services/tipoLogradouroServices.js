const database = require('../database/dbConfig');

const buscarTipoLogradouro = (idTipoLogradouro) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM tipologradouro WHERE tipologradouro.idTipoLogradouro = ?', [idTipoLogradouro], (error, results) =>{
            if (error) { rejeitado(error); return; }
            if (results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
}

const inserirTipoLogradouro = (tipoLogradouro) => {
    return new Promise((aceito, rejeitado) => {
        database.query('INSERT INTO tipoLogradouro (tipoLogradouro) VALUES (?)', [tipoLogradouro], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results.insertId);
        });
    });
}

const buscarIdTipoLogradouro = (tipoLogradouro) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM tipologradouro WHERE tipologradouro = ?', [tipoLogradouro], (error, results) =>{
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
    buscarTipoLogradouro,
    inserirTipoLogradouro,
    buscarIdTipoLogradouro,
};