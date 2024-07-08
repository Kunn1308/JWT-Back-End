import express from "express";
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import groupController from "../controllers/groupController";
import forgotPasswordController from "../controllers/forgotPasswordController";
import resetPasswordController from "../controllers/resetPasswordController";
import JWTAction from "../middleware/JWTAction";
import roleController from "../controllers/roleController";
const router = express.Router();

const initApiRoutes = (app) => {
    router.all("*", JWTAction.checkJWT, JWTAction.checkUserPermission);
    router.get("/test-api", apiController.TestApi);
    router.post("/signup", apiController.handleSignup);
    router.post("/signin", apiController.handleSignin);
    router.post("/signout", apiController.handleSignOut);
    router.get("/account", userController.getUserAccount);

    //user
    router.get("/user/show", userController.showFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    //role
    router.get("/role/show", roleController.showFunc);
    router.post("/role/create", roleController.createFunc);
    router.put("/role/update", roleController.updateFunc);
    router.delete("/role/delete", roleController.deleteFunc);
    router.get("/role/by-group/:groupId", roleController.getRoleByGroup);

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
