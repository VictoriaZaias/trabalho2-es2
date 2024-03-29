const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connection.getConnection((error, connection) =>{
    if(error){
        throw error;
    }else{
        console.log(`Conectando ao Banco de dados: ${process.env.DB_NAME}`);
        if(connection) connection.release();
        return;
    }
});

connection.query = util.promisify(connection.query)

module.exports = connection;