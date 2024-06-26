const database = require('../database/dbConfig');

const listarTimes = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM time', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscarTime= (idTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM time WHERE time.idTime = ?', [idTime], (error, results) =>{
            if (error) { rejeitado(error); return; }
            if (results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
}

const inserirTime = (nomeTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('INSERT INTO time (nomeTime) VALUES (?)', [nomeTime], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results.insertId);
        });
    });
}

const alterarTime = (idTime, nomeTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('UPDATE time SET nomeTime = ?  WHERE idTime = ?', [nomeTime, idTime], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const excluirTime = (idTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('DELETE FROM time WHERE idTime = ?', [idTime], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

module.exports = {
    listarTimes,
    buscarTime,
    inserirTime,
    alterarTime,
    excluirTime
};