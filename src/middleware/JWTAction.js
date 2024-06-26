import jwt from "jsonwebtoken";
const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
    } catch (e) {
        console.log(e);
    }
    return token;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (e) {
        console.log(e);
    }
    return decoded;
};

const checkJWT = (req, res, next) => {
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                EM: "No authenticated the user",
                EC: -1,
                DT: "",
            });
        }
    } else {
        return res.status(401).json({
            EM: "No authenticated the user",
            EC: -1,
            DT: "",
        });
    }
};

const checkUserPermission = (req, res, next) => {
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        if (!roles && roles.length === 0) {
            return res.status(403).json({
                EM: "you don't permission to access this resource",
                EC: -1,
                DT: "",
            });
        }
        let canAccess = roles.some((item) => item.url === currentUrl);
        if (canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EM: "you don't permission to access this resource",
                EC: -1,
                DT: "",
            });
        }
    } else {
        return res.status(401).json({
            EM: "No authenticated the user",
            EC: -1,
            DT: "",
        });
    }
};

export default { createJWT, verifyToken, checkJWT, checkUserPermission };
