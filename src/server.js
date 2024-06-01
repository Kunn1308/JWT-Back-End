import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import methodOverride from "method-override";
require("dotenv").config();
// import connection from "./configs/connectDB";

const app = express();
const PORT = process.env.PORT;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.REACT_URL);
    res.header("Access-Control-Allow-Headers", true);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//config view engine
configViewEngine(app);

//init web routes
initWebRoutes(app);

//test connection DB
// connection();

app.listen(PORT, () => {
    console.log(">>> JWT backend is running on the port " + PORT);
});
