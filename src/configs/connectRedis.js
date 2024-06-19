import { createClient } from "redis";
const client = createClient({
    password: "oj7DCcKBfE6Mw1SWj3iT68qdElNUbusE",
    socket: {
        host: "redis-12891.c11.us-east-1-2.ec2.redns.redis-cloud.com",
        port: 12891,
    },
});

const connectRedis = async () => {
    if (!client.isOpen) {
        await client.connect();
        console.log("Connection with Redis has been established successfully.");
    }
};
const connectionRedis = async (req, res, next) => {
    try {
        await connectRedis();
        res.locals.client = client;
    } catch (e) {
        console.error("Unable to connect to the database:", e);
    }
    next();
};

export default connectionRedis;
