import pool from "@/backend/models/db";
import LashistasService from "@/backend/services/lashistas";

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
      const result = await LashistasService.createLashista(
        req.body
      );
      res.status(200).json(result);
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  } finally {
    // Close the connection
    //await connection.end();
  }
}
