require("dotenv").config({ path: "variaveis.env" });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use("/empresa-tec", routes);
/*
server.use(
  cors({
    origin: "https://t1-es2-frontend-648c67252b2e.herokuapp.com",
  })
);
*/

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor rodando na porta:${port}`);
});
