const timeServices = require('../services/timeServices');

const listarTimes = async (req, res) => {
    let json = {error:'', result:[]};

    let times = await timeServices.listarTimes();

    for(let i in times){
        json.result.push({
            idTime: times[i].idTime,
            nomeTime: times[i].nomeTime,
        });
    }  
    res.json(json);
}

module.exports = {
    listarTimes,
};