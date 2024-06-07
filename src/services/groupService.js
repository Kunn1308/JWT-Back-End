import db from "../models";
const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order: [["name", "ASC"]],
        });
        return {
            EM: "Get Groups is successfully",
            EC: 0,
            DT: data,
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

export default { getGroups };
