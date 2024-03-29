const logradouroServices = require('../services/logradouroServices');

const buscarLogradouro = async (req, res) => {
    let json = { error: '', result: {} };

    let idLogradouro = req.params.idLogradouro;
    let logradouro = await logradouroServices.buscarLogradouro(idLogradouro);
    
    console.log();

    if (logradouro) {
        json.result = {
            idLogradouro: logradouro.idLogradouro,
            logradouro: logradouro.logradouro,
        };
    }
    res.json(json);
}

module.exports = {
    buscarLogradouro,
};