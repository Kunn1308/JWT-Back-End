const configCors = (app) => {
    app.use(function (req, res, next) {
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
        next();
    });
};
export default configCors;
