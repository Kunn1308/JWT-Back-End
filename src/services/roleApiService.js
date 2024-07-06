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
    let role = await db.Role.findAll({
        order: [["id", "DESC"]],
    });
    return {
        EM: "Get all roles succeeds",
        EC: 0,
        DT: role,
    };
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

export default {
    createNewRoles,
    getAllRoles,
    deleteRole,
};
