import userService from "../services/userService";

const handleHelloWorld = (req, res) => {
    res.render("home");
};

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    res.render("user", { userList });
};

const handleCreateNewUser = async (req, res) => {
    let { email, username, password } = req.body;
    await userService.createNewUser(email, username, password);
    res.redirect("back");
};

const handleDeleteUser = async (req, res) => {
    let userId = req.params.id;
    await userService.deleteUser(userId);
    res.redirect("back");
};

export default {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
};
