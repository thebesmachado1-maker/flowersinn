const express = require('express');
const router = express.Router();
const HotelControlador = require('../controlador/HotelControlador');
const AuthControlador = require('../controlador/authControler');

router.get('/habitaciones', HotelControlador.listarHabitaciones);
router.get('/habitaciones/tipos', HotelControlador.listarTipos);
router.get('/portada', HotelControlador.listarPortada);
router.get('/galeria', HotelControlador.listarGaleria);
router.post('/habitaciones', HotelControlador.crearHabitacion);
router.put('/habitaciones/:id/estado', HotelControlador.actualizarEstado);
router.delete('/habitaciones/:id', HotelControlador.eliminarHabitacion);

router.post('/login', AuthControlador.login);

module.exports = router;