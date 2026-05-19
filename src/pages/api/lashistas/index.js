import pool from "@/backend/models/db";
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Query the lashistas table
      const [rows] = await pool.query(
        "SELECT * FROM lashistas WHERE isDeleted != 1 ORDER BY nombre ASC"
      );
      // Send the results as an array
      res.status(200).json(rows);
    } else if (req.method === "POST") {
      const {
        nombre,
        email,
        password,
        horarioLV,
        horarioSBD,
      } = req.body;
      const [result] = await pool.query(
        "INSERT INTO lashistas (nombre, email, password, horarioLV, horarioSBD) VALUES (?, ?, ?, ?, ?)",
        [nombre, email, password, horarioLV, horarioSBD]
      );
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    // Close the connection
    //await connection.end();
  }
}
