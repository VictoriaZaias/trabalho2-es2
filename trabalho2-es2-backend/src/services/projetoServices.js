const database = require('../database/dbConfig');

const listarProjetos = () => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM projeto', (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscarProjeto= (idProjeto) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM projeto WHERE projeto.idProjeto = ?', [idProjeto], (error, results) =>{
            if (error) { rejeitado(error); return; }
            if (results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
}

const inserirProjeto = (nomeProjeto,nomeCliente, objetivo, dataInicio, dataTermino, valor,idTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query
        ('INSERT INTO projeto (nomeProjeto, nomeCliente, objetivo, dataInicio, dataTermino, valor, isConcluido, Time_idTime) VALUES (?,?,?,?,?,?,?,?)', 
        [nomeProjeto, nomeCliente, objetivo, dataInicio, dataTermino, valor, 0, idTime], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results.insertId);
        });
    });
}

const alterarProjeto = (idProjeto, nomeProjeto, nomeCliente, objetivo, dataInicio, dataTermino, valor, isconcluido, idTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('UPDATE projeto SET nomeProjeto = ?, nomeCliente = ?, objetivo = ?, dataInicio = ?, dataTermino = ?, valor = ?, isConcluido = ?, Time_idTime = ?  WHERE idProjeto = ?',
         [nomeProjeto, nomeCliente, objetivo, dataInicio, dataTermino, valor, isconcluido, idTime, idProjeto], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const excluirProjeto = (idProjeto) => {
    return new Promise((aceito, rejeitado) => {
        database.query('DELETE FROM projeto WHERE idProjeto = ?', [idProjeto], (error, results) =>{
            if (error) { rejeitado(error); return; }
            aceito(results);
        });
    });
}

const buscarProjetosPorTime= (idTime) => {
    return new Promise((aceito, rejeitado) => {
        database.query('SELECT * FROM projeto WHERE projeto.Time_idTime = ?', [idTime], (error, results) =>{
            if (error) { rejeitado(error); return; }
            if (results.length > 0){
                aceito(results);
            }else{
                aceito(false);
            }
        });
    });
}


module.exports = {
    listarProjetos,
    buscarProjeto,
    buscarProjetosPorTime,
    inserirProjeto,
    alterarProjeto,
    excluirProjeto,
};