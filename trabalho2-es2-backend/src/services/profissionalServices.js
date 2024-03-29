const database = require('../database/dbConfig');

const listarProfissionais = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM profissional WHERE isAtivo = 1', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

module.exports = {
    listarProfissionais,
};