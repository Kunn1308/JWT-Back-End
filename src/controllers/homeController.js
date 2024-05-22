const handleHelloWorld = (req, res) => {
    res.render("home");
};

const handleUserPage = (req, res) => {
    res.render("user");
};

export default { handleHelloWorld, handleUserPage };
