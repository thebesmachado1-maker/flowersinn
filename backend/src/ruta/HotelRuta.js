const express = require('express');
const router = express.Router();

const HotelControlador =
require('../controlador/HotelControlador');

router.get(
    '/habitaciones',
    HotelControlador.listarHabitaciones
);


router.post(
    '/habitaciones',
    HotelControlador.crearHabitacion
);



router.put(
    '/habitaciones/:id/estado',
    HotelControlador.actualizarEstado
);
module.exports = router;