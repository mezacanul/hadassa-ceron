import pool from "../models/db";

async function createLashista(data) {
  // Extraer los datos del lashista
  const { nombre, email, password, horarioLV, horarioSBD } =
    data;
  // Insertar el lashista en la base de datos
  const [result] = await pool.query(
    `INSERT INTO 
      lashistas 
      (id, rol, image, nombre, email, password, horarioLV, horarioSBD) 
    VALUES 
      (UUID(), 'lashista', 'default.jpg', ?, ?, ?, ?, ?)`,
    [nombre, email, password, horarioLV, horarioSBD]
  );

  // Verificar si el lashista se creó correctamente
  if (result.affectedRows > 0) {
    // Obtener el ID del lashista recién creado
    const [queryResult] = await pool.query(
      `SELECT * FROM lashistas WHERE email = ?`,
      [email]
    );
    const lastInserted = queryResult[0];
    const lashistaID = lastInserted.id;

    // Crear prefijo para nombre de camas
    const camaPrefix = `cama-${nombre.toLowerCase()}-`;

    const records = [
      [`${camaPrefix}1`, lashistaID],
      [`${camaPrefix}2`, lashistaID],
    ];

    // Crear camas para la lashista
    const [result2] = await pool.query(
      `INSERT INTO camas (id, lashista_id) VALUES ?`,
      [records]
    );
    if (result2.affectedRows > 0) {
      return lastInserted;
    } else {
      const deleteQuery = `DELETE FROM lashistas WHERE id = ?`;
      await pool.query(deleteQuery, [lashistaID]);
      throw new Error("Failed to create camas");
    }
  } else {
    throw new Error("Failed to create lashista");
  }
}

const LashistasService = {
  createLashista,
};

export default LashistasService;
