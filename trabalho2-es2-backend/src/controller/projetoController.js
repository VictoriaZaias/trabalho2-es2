const projetoServices = require('../services/projetoServices');
const timeServices = require('../services/timeServices');

const listarProjetos = async (req, res) => {
    let json = {error:'', result:[]};

    let projetos = await projetoServices.listarProjetos();

    for(let i in projetos){
        // let cliente = await clienteServices.buscarCliente(projetos[i].Cliente_idCliente);
        let time = await timeServices.buscarTime(projetos[i].Time_idTime);
        json.result.push({
            idProjeto: projetos[i].idProjeto,
            nomeProjeto: projetos[i].nomeProjeto,
            objetivo: projetos[i].objetivo,
            dataInicio: projetos[i].dataInicio,
            dataTermino: projetos[i].dataTermino,
            valor: projetos[i].valor,
            cliente: projetos[i].nomeCompleto,
            time: time.nomeTime
        });
    }  
    res.json(json);
}

const buscarProjeto = async (req, res) => {
    let json = { error: '', result: {} };

    let idProjeto = req.params.id;
    let projeto = await projetoServices.buscarProjeto(idProjeto);
    let time = await timeServices.buscarTime(projeto.Time_idTime);

    if (projeto) {
        json.result = {
            idProjeto: projeto.idProjeto,
            nomeProjeto: projeto.nomeProjeto,
            cliente: projeto.nomeCliente,
            objetivo: projeto.objetivo,
            dataInicio: projeto.dataInicio,
            dataTermino: projeto.dataTermino,
            valor: projeto.valor,
            isConcluido: projeto.isConcluido,
            time: time.nomeTime
        };
    }
    res.json(json);
}

const inserirProjeto = async(req, res) => {
    let json = {error:'', result:{}};

    let nomeProjeto = req.body.nomeProjeto;
    let nomeCliente = req.body.nomeCliente;
    let objetivo = req.body.objetivo;
    let dataInicio = req.body.dataInicio;
    let dataTermino = req.body.dataTermino;
    let valor = req.body.valor;
    let idTime = req.body.idTime;

    if(nomeProjeto && objetivo && dataInicio && dataTermino && valor && nomeCliente && idTime){
        let idProjeto = await projetoServices.inserirProjeto(nomeProjeto,nomeCliente,objetivo,dataInicio,dataTermino,valor,idTime);
        json.result = {
            idProjeto: idProjeto,
            nomeProjeto,
            nomeCliente,
            objetivo,
            dataInicio,
            dataTermino,
            valor,
            idTime
        };
    }else{
        json.error = 'Campos obrigatórios não enviados!';
    }
    res.json(json);
}

const alterarProjeto = async(req, res) => {
    let json = {error:'', result:{}};

    let idProjeto = req.params.id;
    let nomeProjeto = req.body.nomeProjeto;
    let nomeCliente = req.body.nomeCliente;
    let objetivo = req.body.objetivo;
    let dataInicio = req.body.dataInicio;
    let dataTermino = req.body.dataTermino;
    let valor = req.body.valor;
    let isConcluido = req.body.isConcluido;
    let idTime = req.body.idTime;

    if(nomeProjeto && objetivo && dataInicio && dataTermino && valor && nomeCliente && idTime){
        await projetoServices.alterarProjeto(idProjeto, nomeProjeto,nomeCliente,objetivo,dataInicio,dataTermino,valor,isConcluido,idTime);
        json.result = {
            idProjeto,
            nomeProjeto,
            cliente: nomeCliente,
            objetivo,
            dataInicio,
            dataTermino,
            valor,
            isConcluido,
            idTime
        };
    }else{
        json.error = 'Campos obrigatórios não enviados!';
    }
    res.json(json);
}

const excluirProjeto = async(req, res) => {
    let json = {error:'', result:{}};

    await projetoServices.excluirProjeto(req.params.id);
    
    res.json(json);
}

module.exports = {
    listarProjetos,
    buscarProjeto,
    inserirProjeto,
    alterarProjeto,
    excluirProjeto,
};