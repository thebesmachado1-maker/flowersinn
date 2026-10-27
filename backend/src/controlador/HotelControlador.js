const HotelModelo = require('../modelo/HotelModelo');

class HotelControlador {

    static async listarHabitaciones(req, res) {

    try {

        const habitaciones =
        await HotelModelo.obtenerHabitaciones();

        res.json(habitaciones);

    } catch(error) {

        res.status(500).json({
            error: error.message
        });

    }

}

    

    static async crearHabitacion(
    req,
    res
) {

    try {

        const {
            numero,
            tipo,
            precio_referencia,
            estado_actual
        } = req.body;

        const habitacion =
        await HotelModelo.crearHabitacion(
            numero,
            tipo,
            precio_referencia,
            estado_actual
        );

        res.status(201).json(
            habitacion
        );

    } catch(error) {

        res.status(500).json({
            error: error.message
        });

    }

}

    static async actualizarEstado(req, res){

    try{

        const { id } = req.params;

        const { estado_actual } = req.body;

        const resultado =
        await HotelModelo.actualizarEstado(
            id,
            estado_actual
        );

        res.json(resultado);

    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

}

    static async eliminarHabitacion(req, res) {

        try {

            const id = req.params.id;

            await HotelModelo.eliminarHabitacion(id);

            res.json({
                mensaje:
                    'Habitación eliminada correctamente'
            });

        } catch (error) {

            res.status(500).json({
                mensaje: error.message
            });

        }

    }
}

module.exports = HotelControlador;