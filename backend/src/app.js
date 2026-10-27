const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const hotelRoutes = require('./ruta/HotelRuta');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/test-db', async (req, res) => {

  try {

    const result = await pool.query('SELECT NOW()');

    res.json({
      mensaje: '¡Conexión a PostgreSQL funcionando perfectamente!',
      hora_servidor: result.rows[0].now
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

});

app.get('/', (req, res) => {
  res.send('Servidor Backend funcionando');
});

/* RUTAS */
app.use('/api', hotelRoutes);

app.listen(PORT, () => {
  console.log(
    `Servidor backend corriendo en http://localhost:${PORT}`
  );
});