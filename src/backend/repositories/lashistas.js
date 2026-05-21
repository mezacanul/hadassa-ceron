// import connection from "../models/db";
import pool from "../models/db";

async function getById(id) {
  const query = `SELECT * FROM lashistas WHERE id = ?`;
  const [rows] = await pool.query(query, [id]);
  return rows;
}

async function deactivateLashista(id) {
  const query = `UPDATE lashistas SET isDeleted = 1 WHERE id = ?`;
  const [result] = await pool.query(query, [id]);
  return result;
}

const lashistasRepository = {
  getById,
  deactivateLashista,
};

export default lashistasRepository;
