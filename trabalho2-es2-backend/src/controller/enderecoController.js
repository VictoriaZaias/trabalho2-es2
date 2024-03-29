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

module.exports = {
    buscarEndereco,
};