"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    email: "ngockunn13801@gmail.com",
                    password: "ngoc123",
                    username: "Minh Ngọc",
                },
                {
                    email: "trungnam@gmail.com",
                    password: "nam123",
                    username: "Trung Nam",
                },
                {
                    email: "thanhtai@gmail.com",
                    password: "tai123",
                    username: "Thành Tài",
                },
                {
                    email: "lamtamhuong@gmail.com",
                    password: "huong123",
                    username: "Tâm Hương",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
