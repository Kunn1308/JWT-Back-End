import { where } from "sequelize";
import db from "../models";
const getAllUsers = async () => {
    try {
        let user = await db.User.findAll({
            attributes: ["username", "email", "phone", "address", "gender"],
            include: { model: db.Group, attributes: ["name", "description"] },
        });

        if (user) {
            return {
                EM: "get Users Successfully",
                EC: 0,
                DT: user,
            };
        } else {
            return {
                EM: "Not found User",
                EC: 0,
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong is service...",
            EC: -2,
            DT: "",
        };
    }
};

const createNewUser = async (data) => {
    try {
        await db.User.create();
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong is service...",
            EC: -2,
            DT: "",
        };
    }
};

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id },
        });

        if (user) {
            await db.User.update({});
        } else {
            //not found
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong is service...",
            EC: -2,
            DT: "",
        };
    }
};

const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: {
                id,
            },
        });
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
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
};
