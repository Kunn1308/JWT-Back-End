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

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    res.render("update-user", { user });
};

const handleUpdateUser = async (req, res) => {
    let { email, username } = req.body;
    let id = req.params.id;
    await userService.updateUser(email, username, id);
    res.redirect("/user");
};

export default {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser,
};
