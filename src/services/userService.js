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

const getUserList = async (req, res) => {
    let users = [];
    try {
        const [results, fields] = await connection.query("SELECT * FROM users");
        users = results;
    } catch (err) {
        console.log(err);
        return users;
    }
    return users;
};

export default { createNewUser, getUserList };
