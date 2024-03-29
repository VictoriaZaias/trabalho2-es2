const database = require('../database/dbConfig');

const listarProjetos = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM projeto WHERE isAtivo = 1', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscarProjeto= (idProjeto) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM projeto WHERE projeto.idProjeto = ? AND isAtivo = 1', [idProjeto], (error, results) =>{
            if (error) { rejeitado(error); return; }
            if (results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
}

const inserirProjeto = (nomeProjeto, objetivo, dataInicio, dataTermino, valor, idCliente, idTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query
        ('INSERT INTO projeto (nomeProjeto, objetivo, dataInicio, dataTermino, valor, isAtivo, Cliente_idCliente, Time_idTime) VALUES (?,?,?,?,?,?,?,?)', 
        [nomeProjeto, objetivo, dataInicio, dataTermino, valor, 1, idCliente, idTime], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results.insertId);
        });
    });
}

const alterarProjeto = (idProjeto, nomeProjeto, objetivo, dataInicio, dataTermino, valor, idCliente, idTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('UPDATE projeto SET nomeProjeto = ?, objetivo = ?, dataInicio = ?, dataTermino = ?, valor = ?, Cliente_idCliente = ?, Time_idTime = ?  WHERE idProjeto = ?',
         [nomeProjeto, objetivo, dataInicio, dataTermino, valor, idCliente, idTime, idProjeto], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const excluirProjeto = (idProjeto) => {
    return new Promise((aceito, rejeitado) => {
        database.query('UPDATE projeto SET isAtivo = 0 WHERE idProjeto = ?', [idProjeto], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

module.exports = {
    listarProjetos,
    buscarProjeto,
    inserirProjeto,
    alterarProjeto,
    excluirProjeto,
};