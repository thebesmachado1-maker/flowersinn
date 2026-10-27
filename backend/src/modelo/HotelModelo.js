const pool = require('../config/db');

class HotelModelo {

    // Listar habitaciones
   static async obtenerHabitaciones() {

    const result = await pool.query(
        'SELECT * FROM habitaciones'
    );

    return result.rows;
}

    // Buscar por ID
    static async obtenerHabitacionPorId(id) {
        const result = await pool.query(
            'SELECT * FROM habitaciones WHERE id = $1',
            [id]
        );

        return result.rows[0];
    }

    // Crear habitación
    static async crearHabitacion(
    numero,
    tipo,
    precio_referencia,
    estado_actual
) {

    const result = await pool.query(

        `INSERT INTO habitaciones
        (
            numero,
            tipo,
            precio_referencia,
            estado_actual
        )
        VALUES($1,$2,$3,$4)
        RETURNING *`,

        [
            numero,
            tipo,
            precio_referencia,
            estado_actual
        ]

    );

    return result.rows[0];
}
    // Actualizar
    static async actualizarEstado(
    id,
    estado_actual
){

    const resultado =
    await pool.query(

        `
        UPDATE habitaciones
        SET estado_actual = $1
        WHERE id = $2
        RETURNING *
        `,

        [
            estado_actual,
            id
        ]

    );

    return resultado.rows[0];

}
    // Eliminar
    static async eliminarHabitacion(id) {

        await pool.query(
            'DELETE FROM habitaciones WHERE id=$1',
            [id]
        );

        return true;
    }
}

module.exports = HotelModelo;

