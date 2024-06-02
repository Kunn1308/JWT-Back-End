import db from "../models";
import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: {
            email: userEmail,
        },
    });

    return user ? true : false;
};

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: {
            phone: userPhone,
        },
    });

    return user ? true : false;
};

const signUpNewUser = async (rawUserData) => {
    try {
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: "The email already exists",
                EC: -1,
            };
        }

        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: "The phone already exists",
                EC: -1,
            };
        }

        let hashPassword = hashUserPassword(rawUserData.password);

        await db.User.create({
            username: rawUserData.username,
            email: rawUserData.email,
            phone: rawUserData.phone,
            password: hashPassword,
        });

        return {
            EM: "A user is created successfully",
            EC: 0,
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong is service...",
            EC: -2,
        };
    }
};

export default {
    signUpNewUser,
};
