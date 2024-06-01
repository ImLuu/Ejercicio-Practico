const mysql = require('promise-mysql');
require('dotenv').config();

//Creamos la conexión MySQL 
const connection = mysql.createConnection({
  host: 'itnovai-test.czny55quvxhk.us-east-1.rds.amazonaws.com',
  user: 'itnovai_test',
  database: 'itnovai_test',
  password:'itnovai_test'
});

const getConnection = async () => connection;
module.exports = {getConnection}