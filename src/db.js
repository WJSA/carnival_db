const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'will',
    host: 'localhost',
    port: 5432,
    database: 'TestDB'
})

module.exports = pool;