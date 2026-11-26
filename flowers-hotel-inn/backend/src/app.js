require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const hotelRoutes = require('./ruta/HotelRuta');

const app = express();
const PORT = process.env.PORT || 5000;

/* MIDDLEWARES */
app.use(cors());
app.use(express.json());

/* IMÁGENES (carpeta backend/imagenes) */
app.use('/imagenes', express.static(path.join(__dirname, '..', 'imagenes')));

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