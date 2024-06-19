import forgotPasswordService from "../services/forgotPasswordService";

const handleAuthentication = async (req, res) => {
    try {
        let data = await forgotPasswordService.authenticationUser(
            req.body,
            res.locals.client
        );
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};
const handleVerifyOtp = async (req, res) => {
    try {
        let data = await forgotPasswordService.VerifyOtpUser(
            req.body,
            res.locals.client
        );
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};
export default {
    handleAuthentication,
    handleVerifyOtp,
};
