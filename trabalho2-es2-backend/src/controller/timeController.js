const { buscarProfissionaisPorTime, alterarProfissional, removerTimeProfissional } = require('../services/profissionalServices');
const { buscarProjetosPorTime, excluirProjeto } = require('../services/projetoServices');
const timeServices = require('../services/timeServices');

const listarTimes = async (req, res) => {
    let json = { error: '', result: [] };

    let times = await timeServices.listarTimes();

    for (let i in times) {
        json.result.push({
            idTime: times[i].idTime,
            nomeTime: times[i].nomeTime,
        });
    }
    res.json(json);
}

const buscarTime = async (req, res) => {
    let json = { error: '', result: {} };

    let idTime = req.params.id;
    let time = await timeServices.buscarTime(idTime);

    console.log(time);

    if (time) {
        json.result = {
            idTime: time.idTime,
            nomeTime: time.nomeTime,
        };
    }
    res.json(json);
}

const inserirTime = async (req, res) => {
    let json = { error: '', result: {} };

    let nomeTime = req.body.nomeTime;
    console.log("Nome do time: " + nomeTime);

    if (nomeTime) {
        let idTime = await timeServices.inserirTime(nomeTime);
        json.result = {
            idTime: idTime,
            nomeTime: nomeTime,
        };
    } else {
        json.error = 'Campos obrigatórios não enviados!';
    }
    res.json(json);
}

const alterarTime = async (req, res) => {
    let json = { error: '', result: {} };

    let idTime = req.params.id;
    let nomeTime = req.body.nomeTime;

    if (nomeTime) {
        await timeServices.alterarTime(idTime, nomeTime);
        json.result = {
            idTime: idTime,
            nometime: nomeTime,
        };
    } else {
        console.log(nomeTime);
        json.error = 'Campos obrigatórios não enviados!';
    }
    res.json(json);
}

const excluirTime = async (req, res) => {
    let json = { error: '', result: {} };
    let idTime = req.params.id;
    let projetosTime = await buscarProjetosPorTime(idTime);

    console.log("Excluir Time");
    console.log(projetosTime);

    for (let i in projetosTime) {
        if (projetosTime[i].isConcluido === 0) {//se UM projeto ainda não for concluido, não pode deletar o time!
            res.status(500).send('Ocorreu um erro ao excluir o time: Há projetos pendentes, portanto não pode ser excluído.');
            return;
        }

    }

    //Exclui todos os projetos
    for (let i in projetosTime) {
        await excluirProjeto(projetosTime[i].idProjeto)
    }

    //Obtem os profissionais que estão no time atual:
    let profissionais = buscarProfissionaisPorTime(idTime);
    console.log(profissionais);

    for (let i in profissionais) {
        let idProfissional = profissionais[i].idProfissional;
        // let nomeCompleto = profissionais[i].nomeCompleto;
        // let dataNascimento = profissionais[i].dataNascimento;
        // let raca = profissionais[i].raca;
        // let genero = profissionais[i].genero;
        // let nroEndereco = profissionais[i].nroEndereco;
        // let complementoEndereco = profissionais[i].complementoEndereco;
        // let idEndereco =  profissionais[i].Endereco_idEndereco;
        // let idEspecialidade = profissionais[i].Especialidade_idEspecialidade;
        // let idtime = null;
        // alterarProfissional(idProfissional,nomeCompleto,)
       await removerTimeProfissional(idProfissional);
    }
    try {
        await timeServices.excluirTime(idTime);
        res.status(200).send('Registro de time excluído com sucesso!');
    } catch (error) {
        // Se ocorrer um erro durante a exclusão, envie uma resposta de erro
        console.error('Erro ao excluir o registro de time:', error);
        res.status(500).send('Ocorreu um erro ao excluir o registro de time.');
    }

    // res.json(json);
}

module.exports = {
    listarTimes,
    buscarTime,
    inserirTime,
    alterarTime,
    excluirTime
};