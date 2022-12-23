//const sqlite = require('better-sqlite3');
//const path = require('path');
//const db = new sqlite(path.resolve(process.env.DB_NAME), {fileMustExist: true});

const sql = require('mssql');
const config = require('./config.js');

const db = sql.connect(config);

async function query(query) {
  try {
      var resultSet = await db.request().query(query);
      return resultSet
  } catch (err) {
      console.error(err.message);
  }
}

/*
function query(sql, params) {
  return db.prepare(sql).all(params);
}

*/

module.exports = {
  query
}