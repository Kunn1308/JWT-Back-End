import express from "express";
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
const router = express.Router();

const initApiRoutes = (app) => {
    router.get("/test-api", apiController.TestApi);
    router.post("/signup", apiController.handleSignup);
    router.post("/signin", apiController.handleSignin);

    router.get("/user/show", userController.showFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);
    return app.use("/api/v1/", router);
};

export default initApiRoutes;
