import resetPasswordService from "../services/resetPasswordService";
const handleResetPassword = async (req, res) => {
    try {
        let data = await resetPasswordService.resetUserPassword(req.body);
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

export default { handleResetPassword };
