import db from "../models";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};
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
            include: {
                model: db.Group,
                attributes: ["name", "description", "id"],
            },
            order: [["id", "DESC"]],

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

const checkEmailExists = async (userEmail) => {
    let user = await db.User.findOne({ where: { email: userEmail } });
    return user ? true : false;
};

const checkPhoneExists = async (userPhone) => {
    let user = await db.User.findOne({ where: { phone: userPhone } });
    return user ? true : false;
};

const createNewUser = async (data) => {
    try {
        let isEmailExist = await checkEmailExists(data.email);
        if (isEmailExist) {
            return {
                EM: "The email already exists",
                EC: -1,
                DT: "email",
            };
        }
        let isPhoneExist = await checkPhoneExists(data.phone);
        if (isPhoneExist) {
            return {
                EM: "The phone already exists",
                EC: -1,
                DT: "phone",
            };
        }

        let hashPassword = hashUserPassword(data.password);

        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: "Create new user successfully",
            EC: 0,
            DT: [],
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

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: "Error with empty groupId",
                EC: 1,
                DT: "groupId",
            };
        }

        let user = await db.User.findOne({
            where: { id: data.id },
        });

        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                gender: data.gender,
                groupId: data.groupId,
            });
            return {
                EM: "Update user successfully",
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: "User not founded",
                EC: 2,
                DT: "",
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
