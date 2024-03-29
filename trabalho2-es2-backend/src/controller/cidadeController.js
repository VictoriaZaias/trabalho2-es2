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

module.exports = {
    buscarCidade,
};