import db from "../models";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

const handleHashOtp = (otp) => {
    return bcrypt.hashSync(otp, salt);
};

const createOtp = async (data, clientRedis) => {
    let otp = Math.floor(Math.random() * 1000000);
    let hashOtp = handleHashOtp(String(otp));
    console.log("check hashOtp: ", hashOtp);
    await clientRedis.set(data.email, hashOtp, { EX: 300 });
    await clientRedis.disconnect();
    return otp;
};
const sendEmailAuthentication = async (data, clientRedis) => {
    let otp = await createOtp(data, clientRedis);
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "ngockunn13801@gmail.com",
            pass: "jkik stbn ralm fsnn",
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const info = await transporter.sendMail({
        from: '"Ngọc Kunn 13801 nè!!! 👻" <ngockunn13801@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: "Yêu cầu xác thực", // Subject line
        html: `
        <h3>Xin chào ${data.username},</h3>
        <p>Mã xác thực của bạn là: <strong>${otp}</strong></p>
        <p>Để cài lại mật khẩu chúng tôi cần xác nhận danh tính người dùng. Mã xác thực chỉ có hiệu lực trong vòng 5 phút</p>
        <p>Nếu bạn không yêu cầu mã nào, có thể ai đó đang cố truy cập
            vào tài khoản của bạn.
            <a href="#">
                Bạn có thể thay đổi mật khẩu để bảo vệ tài khoản của
                mình
            </a>
        </p>
        <br />
        <p>Cảm ơn bạn!</p>
        `, // html body
    });
};

const authenticationUser = async (data, clientRedis) => {
    try {
        let user = await db.User.findOne({ where: { email: data.emailUser } });
        if (user) {
            sendEmailAuthentication(user, clientRedis);
            return {
                EM: "Email sent successfully. Please check your email",
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

const checkOtp = (otp, hashOtp) => {
    return hashOtp ? bcrypt.compareSync(otp, hashOtp) : false;
};

const VerifyOtpUser = async (data, clientRedis) => {
    try {
        const otp = await clientRedis.get(data.email);
        let isCorrectOtp = checkOtp(data.otpUser, otp);
        if (isCorrectOtp === true) {
            await clientRedis.disconnect();
            return {
                EM: "Authenticated OTP succeed",
                EC: 0,
                DT: [],
            };
        }
        await clientRedis.disconnect();
        return {
            EM: "Otp is incorrect",
            EC: 2,
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
export default {
    authenticationUser,
    VerifyOtpUser,
};
