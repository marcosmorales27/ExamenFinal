// src/controllers/prestamos.controller.js
const pool = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, e.nombre AS equipo_nombre 
      FROM prestamos p
      JOIN equipos e ON p.equipo_id = e.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { equipo_id, nombre_solicitante, fecha_devolucion_estimada, observaciones } = req.body;

  if (!equipo_id || !nombre_solicitante) {
    return res.status(400).json({ error: 'equipo_id y nombre_solicitante son obligatorios' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Verificar que el equipo exista y esté disponible
    const [equipoRows] = await connection.query(
      'SELECT estado FROM equipos WHERE id = ? FOR UPDATE',
      [equipo_id]
    );

    if (equipoRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    if (equipoRows[0].estado !== 'disponible') {
      await connection.rollback();
      return res.status(400).json({ error: 'El equipo no está disponible' });
    }

    // 2. Insertar el préstamo
    const [result] = await connection.query(
      `INSERT INTO prestamos (equipo_id, nombre_solicitante, fecha_devolucion_estimada, observaciones)
       VALUES (?, ?, ?, ?)`,
      [equipo_id, nombre_solicitante, fecha_devolucion_estimada || null, observaciones || null]
    );

    // 3. Actualizar el estado del equipo
    await connection.query(
      "UPDATE equipos SET estado = 'prestado' WHERE id = ?",
      [equipo_id]
    );

    await connection.commit();
    res.status(201).json({ message: 'Préstamo registrado', id: result.insertId });

  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
};

exports.remove = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Obtener el equipo_id del préstamo antes de borrarlo
    const [prestamoRows] = await connection.query(
      'SELECT equipo_id FROM prestamos WHERE id = ?',
      [req.params.id]
    );

    if (prestamoRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Préstamo no encontrado' });
    }

    const equipoId = prestamoRows[0].equipo_id;

    // 2. Eliminar el préstamo
    await connection.query('DELETE FROM prestamos WHERE id = ?', [req.params.id]);

    // 3. Volver el equipo a disponible
    await connection.query(
      "UPDATE equipos SET estado = 'disponible' WHERE id = ?",
      [equipoId]
    );

    await connection.commit();
    res.json({ message: 'Préstamo eliminado y equipo liberado' });

  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
};