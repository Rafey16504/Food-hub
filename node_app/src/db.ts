const {Pool} = require('pg')

const client = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'FoodHub',
  password: '12345_qwert',
  port: 5432, 
});

module.exports = client



