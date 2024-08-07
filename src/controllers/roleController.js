import roleApiService from "../services/roleApiService";
const showFunc = async (req, res) => {
    try {
        let data = await roleApiService.getAllRoles();

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};
const createFunc = async (req, res) => {
    try {
        let data = await roleApiService.createNewRoles(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};
const updateFunc = async (req, res) => {};
const deleteFunc = async (req, res) => {
    try {
        let data = await roleApiService.deleteRole(req.body.id);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

const getRoleByGroup = async (req, res) => {
    try {
        let id = req.params.groupId;
        let data = await roleApiService.getRoleByGroup(id);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

const assignRoleToGroup = async (req, res) => {
    try {
        let data = await roleApiService.assignRoleToGroup(req.body.data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};
export default {
    showFunc,
    createFunc,
    updateFunc,
    deleteFunc,
    getRoleByGroup,
    assignRoleToGroup,
};
