import pool from "@/backend/models/db";
import LashistasService from "@/backend/services/lashistas";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      let active;
      let inactive = [];
      if (req.query.fetchAll === "true") {
        [inactive] = await pool.query(
          `SELECT * FROM lashistas WHERE isDeleted = 1 ORDER BY nombre ASC`
        );
      }
      [active] = await pool.query(
        `SELECT * FROM lashistas WHERE isDeleted != 1 ORDER BY nombre ASC`
      );
      res.status(200).json([...active, ...inactive]);
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
