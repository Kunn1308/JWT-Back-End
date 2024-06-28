const configCors = (app) => {
    app.use(function (req, res, next) {
        console.log(req.method);
        res.header("Access-Control-Allow-Origin", process.env.REACT_URL);
        res.header(
            "Access-Control-Allow-Headers",
            "X-Requested-With,content-type,Accept,Authorization,Origin"
        );
        res.header("Access-Control-Allow-Credentials", true);
        res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        if (req.method === "OPTIONS") {
            return res.sendStatus(200);
        }
        next();
    });
};
export default configCors;
