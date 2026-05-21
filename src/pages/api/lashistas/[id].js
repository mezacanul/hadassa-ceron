// pages/api/servicios.js
// import mysql from "mysql2/promise";
// import { db_info } from "@/config/db";
import pool from "@/backend/models/db";
import lashistasRepository from "@/backend/repositories/lashistas";

export default async function handler(req, res) {
  // const connection = await mysql.createConnection({
  //     host: db_info.host,
  //     port: db_info.port,
  //     user: db_info.user,
  //     password: db_info.password,
  //     database: db_info.database,
  // });

  try {
    if (req.method == "GET") {
      // res.status(200).json(req.query);
      // return
      if (req.query.id) {
        const [rows] = await pool.query(
          "SELECT * FROM lashistas WHERE id = ?",
          [req.query.id]
        );
        res.status(200).json(rows[0]);
      }
    }
    if (req.method == "PATCH") {
      if (req.body.type == "batch") {
        const { payload } = req.body;
        // res.status(200).json(req.body);
        // return;

        // const { payload } = req.body;
        let query = `UPDATE 
                            lashistas 
                        SET 
                            nombre = ?, 
                            email = ?, 
                            password = ?, 
                            horarioLV = ?, 
                            horarioSBD = ? 
                        WHERE 
                            id = ?`;
        let [result] = await pool.query(query, [
          payload.nombre,
          payload.email,
          payload.password,
          payload.horarioLV,
          payload.horarioSBD,
          req.query.id,
        ]);
        res.status(200).json({
          success: true,
          affectedRows: result.affectedRows,
        });

        // res.status(200).json(req.body.payload);
      } else if (req.query.id && !req.body.type) {
        const { id } = req.query;
        const { column, value } = req.body;
        // res.status(200).json({id, column, value });

        switch (column) {
          case "image":
            let query = `UPDATE lashistas SET image = ? WHERE id = ?`;
            let [result] = await pool.query(query, [
              value,
              id,
            ]);

            res.status(200).json({
              success: true,
              affectedRows: result.affectedRows,
            });
            break;
          default:
            break;
        }
      } else if (req.body.type == "toggleStatus") {
        const { payload } = req.body;
        const { isDeleted } = payload;
        const query = `UPDATE lashistas SET isDeleted = ? WHERE id = ?`;
        const [result] = await pool.query(query, [
          !isDeleted,
          req.query.id,
        ]);
        res.status(200).json({
          success: true,
          affectedRows: result.affectedRows,
        });
      }
    }
    // } else if (req.method == "DELETE") {
    //   const { id } = req.query;
    //   const result =
    //     await lashistasRepository.deactivateLashista(id);
    //   res.status(200).json({
    //     success: true,
    //     affectedRows: result.affectedRows,
    //   });
    // }
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    // await connection.end();
  }
}
