"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await Promise.all([
            queryInterface.addColumn("User", "phone", {
                type: Sequelize.STRING,
            }),
            queryInterface.addColumn("User", "address", {
                type: Sequelize.STRING,
            }),
            queryInterface.addColumn("User", "gender", {
                type: Sequelize.STRING,
            }),
            queryInterface.addColumn("User", "groupId", {
                type: Sequelize.INTEGER,
            }),
        ]);
    },
    async down(queryInterface, Sequelize) {
        await Promise.all([
            queryInterface.removeColumn("User", "phone"),
            queryInterface.removeColumn("User", "address"),
            queryInterface.removeColumn("User", "gender"),
            queryInterface.removeColumn("User", "groupId"),
        ]);
    },
};
