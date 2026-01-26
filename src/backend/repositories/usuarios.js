import pool from "../models/db";

async function getByUsernameAndPassword(
    username,
    password
) {
    const query = `SELECT * FROM usuarios WHERE username = ? AND password = ?`;
    const [rows] = await pool.query(query, [
        username,
        password,
    ]);
    return rows[0];
}

const usuariosRepository = {
    getByUsernameAndPassword,
};

export default usuariosRepository;
