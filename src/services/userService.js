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
        "INSERT INTO users (email, username, password) VALUES (?,?,?)",
        [email, username, hashPassword]
    );
};

const getUserList = async () => {
    try {
        const [rows, fields] = await connection.query("SELECT * FROM users");
        return rows;
    } catch (err) {
        console.log(err);
    }
};

const deleteUser = async (id) => {
    return await connection.query("DELETE FROM users WHERE id = ?", [id]);
};

export default { createNewUser, getUserList, deleteUser };
