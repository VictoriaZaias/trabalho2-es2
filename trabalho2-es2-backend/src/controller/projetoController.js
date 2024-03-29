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

const buscarProjeto = async (req, res) => {
    let json = { error: '', result: {} };

    let idProjeto = req.params.id;
    let projeto = await projetoServices.buscarProjeto(idProjeto);
    let cliente = await clienteServices.buscarCliente(projeto.Cliente_idCliente);
    let time = await timeServices.buscarTime(projeto.Time_idTime);
    console.log(projeto);

    if (projeto) {
        json.result = {
            idProjeto: projeto.idProjeto,
            nomeProjeto: projeto.nomeProjeto,
            objetivo: projeto.objetivo,
            dataInicio: projeto.dataInicio,
            dataTermino: projeto.dataTermino,
            valor: projeto.valor,
            cliente: cliente.nomeCompleto,
            time: time.nomeTime
        };
    }
    res.json(json);
}

module.exports = {
    listarProjetos,
    buscarProjeto,
};