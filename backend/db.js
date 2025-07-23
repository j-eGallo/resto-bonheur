const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'resto_bonheur'
})

module.exports = pool.promise()
