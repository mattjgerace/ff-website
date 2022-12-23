require('dotenv').config()
const env = process.env;

const config = {
  //listPerPage: env.LIST_PER_PAGE || 10,
  user: env.DB_UID, // better stored in an app setting such as process.env.DB_UID
  password: env.DB_PWD, // better stored in an app setting such as process.env.DB_PWD
  server: env.DB_SERVER, // better stored in an app setting such as process.env.DB_SERVER
  port: parseInt(env.DB_PORT), // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: env.DB_NAME, // better stored in an app setting such as process.env.DB_NAME
  authentication: {
      type: 'default'
  },
  options: {
    encrypt: true
  }
}

module.exports = config;