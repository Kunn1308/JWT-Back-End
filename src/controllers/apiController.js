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
            DT: "",
        });
    } catch (e) {
        return res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

export default {
    TestApi,
    handleSignup,
};
