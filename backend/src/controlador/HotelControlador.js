const fs = require('fs/promises');
const path = require('path');
const HotelModelo = require('../modelo/HotelModelo');

const ESTADOS_VALIDOS = ['DISPONIBLE', 'OCUPADA', 'MANTENIMIENTO'];

// backend/imagenes  (este archivo está en backend/src/controlador)
const CARPETA_IMAGENES = path.join(__dirname, '..', '..', 'imagenes');
const EXTENSIONES = /\.(jpe?g|png|webp)$/i;

const responderError = (res, error) =>
    res.status(500).json({ error: error.message });

// "Habitación Sencilla" -> "habitacion-sencilla" (nombre de su carpeta de fotos)
const nombreCarpeta = (tipo) =>
    tipo.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Lista las fotos de una carpeta dentro de backend/imagenes (si no existe, devuelve [])
async function fotosDeCarpeta(carpeta) {
    try {
        const archivos = await fs.readdir(path.join(CARPETA_IMAGENES, carpeta));
        return archivos
            .filter((a) => EXTENSIONES.test(a))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
            .map((a) => `/imagenes/${carpeta}/${encodeURIComponent(a)}`);
    } catch {
        return [];
    }
}

const fotosDelTipo = (tipo) => fotosDeCarpeta(nombreCarpeta(tipo));

class HotelControlador {

    static async listarHabitaciones(req, res) {
        try {
            res.json(await HotelModelo.obtenerHabitaciones());
        } catch (error) {
            responderError(res, error);
        }
    }

    static async listarTipos(req, res) {
        try {
            const tipos = await HotelModelo.obtenerTipos();
            const conFotos = await Promise.all(
                tipos.map(async (t) => ({ ...t, imagenes: await fotosDelTipo(t.tipo) }))
            );
            res.json(conFotos);
        } catch (error) {
            responderError(res, error);
        }
    }

    // Fotos de la galería de instalaciones: una carpeta por área
    static async listarGaleria(req, res) {
        try {
            const areas = ['recepcion', 'piscina', 'comedor'];
            const entradas = await Promise.all(
                areas.map(async (area) => [area, await fotosDeCarpeta(area)])
            );
            res.json(Object.fromEntries(entradas));
        } catch (error) {
            responderError(res, error);
        }
    }

    // Fotos del carrusel de la portada: backend/imagenes/portada
    static async listarPortada(req, res) {
        try {
            res.json(await fotosDeCarpeta('portada'));
        } catch (error) {
            responderError(res, error);
        }
    }

    static async crearHabitacion(req, res) {
        try {
            const { numero, tipo, precio_referencia, estado_actual } = req.body;

            if (!numero || !tipo || precio_referencia === undefined || precio_referencia === '') {
                return res.status(400).json({ error: 'Número, tipo y precio son obligatorios.' });
            }
            if (!ESTADOS_VALIDOS.includes(estado_actual)) {
                return res.status(400).json({ error: 'Estado no válido.' });
            }

            const habitacion = await HotelModelo.crearHabitacion({
                numero, tipo, precio_referencia, estado_actual
            });
            res.status(201).json(habitacion);
        } catch (error) {
            responderError(res, error);
        }
    }

    static async actualizarEstado(req, res) {
        try {
            const { id } = req.params;
            const { estado_actual } = req.body;

            if (!ESTADOS_VALIDOS.includes(estado_actual)) {
                return res.status(400).json({ error: 'Estado no válido.' });
            }

            const habitacion = await HotelModelo.actualizarEstado(id, estado_actual);
            if (!habitacion) {
                return res.status(404).json({ error: 'Habitación no encontrada.' });
            }
            res.json(habitacion);
        } catch (error) {
            responderError(res, error);
        }
    }

    static async eliminarHabitacion(req, res) {
        try {
            const eliminada = await HotelModelo.eliminarHabitacion(req.params.id);
            if (!eliminada) {
                return res.status(404).json({ error: 'Habitación no encontrada.' });
            }
            res.json({ mensaje: 'Habitación eliminada correctamente.' });
        } catch (error) {
            responderError(res, error);
        }
    }
}

module.exports = HotelControlador;