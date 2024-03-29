const enderecoServices = require('../services/enderecoServices');

const buscarEndereco = async (req, res) => {
    let json = { error: '', result: {} };

    let idEndereco = req.params.idEndereco;
    let endereco = await enderecoServices.buscarEndereco(idEndereco);
    
    console.log(endereco);

    if (endereco) {
        json.result = {
            idEndereco: endereco.idEndereco,
            cep: endereco.cep,
        };
    }
    res.json(json);
}

const inserirEndereco = async(req, res) => {
    let json = {error:'', result:{}};

    let cep = req.body.cep;
    let idBairro = req.body.idBairro;
    let idLogradouro = req.body.idLogradouro;
    let idCidade = req.body.idCidade;

    if(cep){
        let existe = await enderecoServices.buscarIdEndereco(cep);
        if(!existe) {
            let idEndereco = await enderecoServices.inserirEndereco(cep, idBairro, idLogradouro, idCidade);
            json.result = {
                idEndereco: idEndereco,
                cep: cep,
            };
        } else {
            json.result = {
                idEndereco: existe.idEndereco,
                cep: cep,
            };
        }
    }else{
        json.error = 'Campos obrigatórios não enviados!';
    }
    res.json(json);
}

const buscarIdEndereco = async (req, res) => {
    let json = { error: '', result: {} };

    let cep = req.params.cep;
    let endereco = await enderecoServices.buscarIdEndereco(cep);
    
    console.log(endereco);

    if (endereco) {
        json.result = {
            idEndereco: endereco.idEndereco,
            cep: endereco.cep,
        };
    }
    res.json(json);
}

module.exports = {
    buscarEndereco,
    inserirEndereco,
    buscarIdEndereco,
};