// usuario.model.js

import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
};

export const createUser = async (email, password) => {
    const [result] = await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password]);
    return result.insertId;
};

export const updateUserProfile = async (email, { name, phone, bio, profileImage }) => {
    // Actualiza la consulta para manejar los campos necesarios
    const query = `UPDATE users SET name = ?, phone = ?, bio = ?, profileImage = ? WHERE email = ?`;
    const values = [name, phone, bio, profileImage, email];
    await pool.execute(query, values); // Usar pool en lugar de db
};
