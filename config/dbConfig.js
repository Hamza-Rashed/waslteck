const mysql = require('mysql2/promise');
require("dotenv").config()

const config = {
  db: {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
    // connectTimeout: 60000
  }
  // listPerPage: 10,
};

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  return results;
}

  module.exports = {
    query
  }