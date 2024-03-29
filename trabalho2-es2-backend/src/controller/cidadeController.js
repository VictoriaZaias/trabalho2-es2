const cidadeServices = require('../services/cidadeServices');

const buscarCidade = async (req, res) => {
    let json = { error: '', result: {} };

    let idCidade = req.params.idCidade;
    let cidade = await cidadeServices.buscarCidade(idCidade);
    
    console.log();

    if (cidade) {
        json.result = {
            idCidade: cidade.idCidade,
            cidade: cidade.cidade,
        };
    }
    res.json(json);
}

const inserirCidade = async(req, res) => {
    let json = {error:'', result:{}};

    let cidade = req.body.cidade;
    let idUnidadeFederativa = req.body.idUnidadeFederativa;

    if(cidade){
        let existe = await cidadeServices.buscarIdCidade(cidade);
        if(!existe) {
            let idCidade = await cidadeServices.inserirCidade(cidade, idUnidadeFederativa);
            json.result = {
                idCidade: idCidade,
                cidade: cidade,
            };
        } else {
            json.result = {
                idCidade: existe.idCidade,
                cidade: cidade,
            };
        }
    }else{
        json.error = 'Campos obrigatórios não enviados!';
    }
    res.json(json);
}

module.exports = {
    buscarCidade,
    inserirCidade,
};