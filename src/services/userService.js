import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import db from "../models";

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
    await db.User.create({
        username: username,
        email: email,
        password: hashPassword,
    });
};

const getUserList = async () => {
    let newUser = await db.User.findAll({
        include: { model: db.Group, attributes: ["name", "description"] },
        attributes: ["id", "username", "email"],
        raw: true,
        nest: true,
    });

    let group = await db.Group.findAll({
        include: {
            model: db.Role,
            where: {
                id: 1,
            },
        },
        raw: true,
        nest: true,
    });

    console.log(">>> check newUser: ", newUser);
    console.log(">>> check group: ", group);
    return await db.User.findAll();
    // const [rows, fields] = await connection.query("SELECT * FROM User");
    // return rows;
};

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: {
            id: userId,
        },
    });
    // return await connection.query("DELETE FROM User WHERE id = ?", [id]);
};

const getUserById = async (id) => {
    return await db.User.findOne({ where: { id } });
    // const [rows, fields] = await connection.query(
    //     "SELECT * FROM User WHERE id = ?",
    //     [id]
    // );
    // let user = rows && rows.length ? rows[0] : [];
    // return user;
};

const updateUser = async (email, username, id) => {
    await db.User.update(
        { email, username },
        {
            where: {
                id,
            },
        }
    );
    // return await connection.query(
    //     "UPDATE User SET email = ?, username = ? WHERE id = ?",
    //     [email, username, id]
    // );
};

export default {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUser,
};
