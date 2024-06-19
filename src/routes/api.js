import express from "express";
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import groupController from "../controllers/groupController";
import forgotPasswordController from "../controllers/forgotPasswordController";
import resetPasswordController from "../controllers/resetPasswordController";

const router = express.Router();

const initApiRoutes = (app) => {
    router.get("/test-api", apiController.TestApi);
    router.post("/signup", apiController.handleSignup);
    router.post("/signin", apiController.handleSignin);

    //user
    router.get("/user/show", userController.showFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    //group
    router.get("/group/show", groupController.showFunc);

    //forgot password
    router.post(
        "/authentication/send_email",
        forgotPasswordController.handleAuthentication
    );
    router.post(
        "/authentication/verify_otp",
        forgotPasswordController.handleVerifyOtp
    );

    //reset password
    router.put("/reset_password", resetPasswordController.handleResetPassword);

    return app.use("/api/v1/", router);
};

export default initApiRoutes;
