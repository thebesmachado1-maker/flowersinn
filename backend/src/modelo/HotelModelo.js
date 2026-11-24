const pool = require('../config/db');

class HotelModelo {

    static async obtenerHabitaciones() {
        const { rows } = await pool.query(
            'SELECT * FROM habitaciones ORDER BY numero'
        );
        return rows;
    }

    // Una fila por tipo de habitación: tarifa de referencia y disponibilidad
    static async obtenerTipos() {
        const { rows } = await pool.query(
            `SELECT tipo,
                    MIN(precio_referencia) AS precio_referencia,
                    COUNT(*) AS total,
                    COUNT(*) FILTER (WHERE estado_actual = 'DISPONIBLE') AS disponibles
             FROM habitaciones
             GROUP BY tipo
             ORDER BY MIN(precio_referencia)`
        );
        return rows;
    }

    static async crearHabitacion({ numero, tipo, precio_referencia, estado_actual }) {
        const { rows } = await pool.query(
            `INSERT INTO habitaciones (numero, tipo, precio_referencia, estado_actual)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [numero, tipo, precio_referencia, estado_actual]
        );
        return rows[0];
    }

    static async actualizarEstado(id, estado_actual) {
        const { rows } = await pool.query(
            `UPDATE habitaciones
             SET estado_actual = $1
             WHERE id = $2
             RETURNING *`,
            [estado_actual, id]
        );
        return rows[0];
    }

    static async eliminarHabitacion(id) {
        const { rowCount } = await pool.query(
            'DELETE FROM habitaciones WHERE id = $1',
            [id]
        );
        return rowCount > 0;
    }
}

module.exports = HotelModelo;
