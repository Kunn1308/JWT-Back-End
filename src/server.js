import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import methodOverride from "method-override";
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//config view engine
configViewEngine(app);

//init web routes
initWebRoutes(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(">>> JWT backend is running on the port " + PORT);
});
