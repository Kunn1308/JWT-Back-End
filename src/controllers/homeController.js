import mysql from "mysql2/promise";

// Create the connection to database
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "jwt",
    port: 3307,
    password: "123456",
});

const handleHelloWorld = (req, res) => {
    res.render("home");
};

const handleUserPage = (req, res) => {
    res.render("user");
};

const handleCreateNewUser = async (req, res) => {
    let { email, username, password } = req.body;
    const [results, fields] = await connection.query(
        "INSERT INTO users (email, username, password) VALUES (?,?,?)",
        [email, username, password]
    );
    console.log(results);
    res.send("create new user successfully");
};

export default { handleHelloWorld, handleUserPage, handleCreateNewUser };
