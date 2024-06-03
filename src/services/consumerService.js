import db from "../models";
import bcrypt from "bcrypt";
const { Op } = require("sequelize");

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
                DT: "email",
            };
        }

        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: "The phone already exists",
                EC: -1,
                DT: "phone",
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

const checkPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

const SignInUser = async (rawUserData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawUserData.valueSignIn },
                    { phone: rawUserData.valueSignIn },
                ],
            },
        });
        if (user) {
            let isCorrectPassword = checkPassword(
                rawUserData.password,
                user.password
            );

            if (isCorrectPassword === true) {
                return {
                    EM: "login successfully",
                    EC: 0,
                    DT: "",
                };
            }
        }
        console.log(
            ">>> Not founder user with email/phone:  ",
            rawUserData.valueSignIn,
            "password: ",
            rawUserData.password
        );
        return {
            EM: "Your email/phone number or password is incorrect",
            EC: "-1",
            DT: "",
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
    signUpNewUser,
    SignInUser,
};
