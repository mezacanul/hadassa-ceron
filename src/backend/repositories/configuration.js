import pool from "../models/db";

async function getByDomain(domain) {
  const query = `SELECT * FROM app_configuration WHERE domain = ?`;
  const [rows] = await pool.query(query, [domain]);
  return rows;
}

const ConfigurationRepo = {
  getByDomain,
};

export default ConfigurationRepo;
