import db from "../models";
const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ["url", "description"],
            raw: true,
        });
        const persists = roles.filter(
            ({ url: url1 }) =>
                !currentRoles.some(({ url: url2 }) => url1 === url2)
        );
        if (persists.length === 0) {
            return {
                EM: "Nothing to create...",
                EC: 0,
                DT: [],
            };
        }
        await db.Role.bulkCreate(persists);
        return {
            EM: `Create roles succeeds: ${persists.length} roles...`,
            EC: 0,
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

const getAllRoles = async () => {
    try {
        let role = await db.Role.findAll({
            order: [["id", "DESC"]],
        });
        return {
            EM: "Get all roles succeeds",
            EC: 0,
            DT: role,
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

const deleteRole = async (id) => {
    try {
        if (id) {
            await db.Role.destroy({
                where: {
                    id,
                },
            });

            return {
                EM: "Delete Role is successfully",
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: "Role is not found",
                EC: 1,
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrong is service...",
            EC: -2,
            DT: "",
        };
    }
};

const getRoleByGroup = async (id) => {
    try {
        let roles = await db.Group.findOne({
            where: { id },
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] },
            },
            attributes: ["id", "name", "description"],
        });
        return {
            EM: "Get all roles succeeds",
            EC: 0,
            DT: roles,
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
const assignRoleToGroup = async (data) => {
    try {
        await db.Group_Role.destroy({ where: { groupId: +data.groupId } });

        await db.Group_Role.bulkCreate(data.groupRoles);
        return {
            EM: "Assign role to group succeeds",
            EC: 0,
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
    createNewRoles,
    getAllRoles,
    deleteRole,
    getRoleByGroup,
    assignRoleToGroup,
};
