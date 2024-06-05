import { where } from "sequelize";
import db from "../models";
const getAllUsers = async () => {
    try {
        let user = await db.User.findAll({
            attributes: [
                "id",
                "username",
                "email",
                "phone",
                "address",
                "gender",
            ],
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
                EC: 1,
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

const getUsersWithPaginate = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            attributes: [
                "id",
                "username",
                "email",
                "phone",
                "address",
                "gender",
            ],
            include: { model: db.Group, attributes: ["name", "description"] },
            offset: offset,
            limit: limit,
        });
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalPages,
            totalRows: count,
            users: rows,
        };

        return {
            EM: "OK",
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
        if (id) {
            await db.User.destroy({
                where: {
                    id,
                },
            });

            return {
                EM: "Delete user is successfully",
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: "User is not found",
                EC: 1,
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

export default {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUsersWithPaginate,
};
