const mysql = require('promise-mysql');
require('dotenv').config();

//Creamos la conexión MySQL 
const conexion = mysql.createConnection({
  host: 'itnovai-test.czny55quvxhk.us-east-1.rds.amazonaws.com',
  user: 'itnovai_test',
  database: 'itnovai_test',
  password:'itnovai_test'
});

const getConexion = async () => conexion;
module.exports = {getConexion}