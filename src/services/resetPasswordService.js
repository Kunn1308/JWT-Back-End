import db from "../models";
import consumerService from "./consumerService";
const resetUserPassword = async (data) => {
    try {
        let user = await db.User.findOne({ where: { email: data.email } });
        if (user) {
            let hashPassword = consumerService.hashUserPassword(data.password);
            await user.update({
                password: hashPassword,
            });
            return {
                EM: "Your password has been changed.",
                EC: 0,
                DT: [],
            };
        }
        return {
            EM: "Not found Email Address",
            EC: 1,
            DT: "email",
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong is service...",
            EC: -2,
            DT: "",
        };
    }
};

export default {
    resetUserPassword,
};
