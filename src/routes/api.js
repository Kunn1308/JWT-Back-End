import express from "express";
import apiController from "../controllers/apiController";
const router = express.Router();

const initApiRoutes = (app) => {
    router.get("/test-api", apiController.TestApi);
    router.post("/signup", apiController.handleSignup);
    return app.use("/api/v1/", router);
};

export default initApiRoutes;
