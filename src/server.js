import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import methodOverride from "method-override";
import configCors from "./configs/cors";
import connectionRedis from "./configs/connectRedis";
import cookieParser from "cookie-parser";
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json()); // phân tích json đến từ các yêu cầu http
//config view engine
configViewEngine(app);

//cookie
app.use(cookieParser());

//config cors middleware
configCors(app);

app.use(connectionRedis);
//init web routes
initWebRoutes(app);
initApiRoutes(app);
//test connection DB
// connection();

app.listen(PORT, () => {
    console.log(">>> JWT backend is running on the port " + PORT);
});
