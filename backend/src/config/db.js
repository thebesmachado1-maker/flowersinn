const { Pool } = require('pg');
require('dotenv').config();

// Crear el estanque de conexiones con las credenciales del .env
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5433,
  user: process.env.DB_USER || 'postgres',
  password: 'root',
  database: process.env.DB_NAME || 'hotel',
});

// Evento cuando la conexión es exitosa
pool.on('connect', () => {
  console.log(' Conexión exitosa a la base de datos PostgreSQL');
});

// Captura de errores inesperados
pool.on('error', (err) => {
  console.error(' Error inesperado en PostgreSQL:', err.message);
});

module.exports = pool;