const database = require('../database/dbConfig');

const listarProjetos = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM projeto WHERE isAtivo = 1', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

module.exports = {
    listarProjetos,
};