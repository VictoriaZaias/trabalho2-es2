const express = require('express');

const profissionalRoutes = require('./profissionalRoutes');
const especialidadeRoutes = require('./especialidadeRoutes');
const enderecoRoutes = require('./enderecoRoutes');
const timeRoutes = require('./timeRoutes');
const projetoRoutes = require('./projetoRoutes');
// const clienteRoutes = require('./clienteRoutes');

const server = express();

server.use('/profissional', profissionalRoutes);
server.use('/especialidade', especialidadeRoutes);
server.use('/endereco', enderecoRoutes);
server.use('/time', timeRoutes);
server.use('/projeto', projetoRoutes);
// server.use('/cliente', clienteRoutes);

module.exports = server;
