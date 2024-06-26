import consumerService from "../services/consumerService";
const TestApi = (req, res) => {
    res.status(200).json({ message: "ok", data: "test api" });
};

const handleSignup = async (req, res) => {
    try {
        if (
            !req.body.username ||
            !req.body.email ||
            !req.body.phone ||
            !req.body.password
        ) {
            return res.status(200).json({
                EM: "Missing params",
                EC: -1,
                DT: "",
            });
        }

        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: "Your password must have more than 4 characters",
                EC: -1,
                DT: "",
            });
        }

        let data = await consumerService.signUpNewUser(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        return res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

const handleSignin = async (req, res) => {
    try {
        let data = await consumerService.SignInUser(req.body);
        //set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

const handleSignOut = (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            EM: "clear cookies successfully",
            EC: 0,
            DT: "",
        });
    } catch (e) {
        res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

export default {
    TestApi,
    handleSignup,
    handleSignin,
    handleSignOut,
};
