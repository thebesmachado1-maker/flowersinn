const pool = require('../config/db');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { usuario, password } = req.body;
    try {
        const resultado = await pool.query(
            'SELECT * FROM usuarios WHERE usuario = $1',
            [usuario]
        );

        if (resultado.rows.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const user = resultado.rows[0];
        const passwordValida = await bcrypt.compare(password, user.password_hash);

        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        res.json({ mensaje: 'Login exitoso', usuario: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};