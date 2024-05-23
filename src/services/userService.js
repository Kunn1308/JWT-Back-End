import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

// Create the connection to database
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "jwt",
    port: 3307,
    password: "123456",
});

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

const createNewUser = async (email, username, password) => {
    let hashPassword = hashUserPassword(password);
    return await connection.query(
        "INSERT INTO Users (email, username, password) VALUES (?,?,?)",
        [email, username, hashPassword]
    );
};

const getUserList = async () => {
    const [rows, fields] = await connection.query("SELECT * FROM Users");
    return rows;
};

const deleteUser = async (id) => {
    return await connection.query("DELETE FROM Users WHERE id = ?", [id]);
};

const getUserById = async (id) => {
    const [rows, fields] = await connection.query(
        "SELECT * FROM Users WHERE id = ?",
        [id]
    );
    let user = rows && rows.length ? rows[0] : [];
    return user;
};

const updateUser = async (email, username, id) => {
    return await connection.query(
        "UPDATE Users SET email = ?, username = ? WHERE id = ?",
        [email, username, id]
    );
};

export default {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUser,
};
