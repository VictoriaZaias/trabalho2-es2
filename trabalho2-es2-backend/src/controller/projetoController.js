const projetoServices = require('../services/projetoServices');
const clienteServices = require('../services/clienteServices');
const timeServices = require('../services/timeServices');

const listarProjetos = async (req, res) => {
    let json = {error:'', result:[]};

    let projetos = await projetoServices.listarProjetos();

    for(let i in projetos){
        let cliente = await clienteServices.buscarCliente(projetos[i].Cliente_idCliente);
        let time = await timeServices.buscarTime(projetos[i].Time_idTime);
        json.result.push({
            idProjeto: projetos[i].idProjeto,
            nomeProjeto: projetos[i].nomeProjeto,
            objetivo: projetos[i].objetivo,
            dataInicio: projetos[i].dataInicio,
            dataTermino: projetos[i].dataTermino,
            valor: projetos[i].valor,
            cliente: cliente.nomeCompleto,
            time: time.nomeTime
        });
    }  
    res.json(json);
}

module.exports = {
    listarProjetos,
};