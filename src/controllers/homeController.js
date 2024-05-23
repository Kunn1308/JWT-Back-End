import userService from "../services/userService";

const handleHelloWorld = (req, res) => {
    res.render("home");
};

const handleUserPage = async (req, res) => {
    res.render("user");
};

const handleCreateNewUser = async (req, res) => {
    let { email, username, password } = req.body;
    await userService.createNewUser(email, username, password);
    res.send("create new user successfully");
};

export default { handleHelloWorld, handleUserPage, handleCreateNewUser };
