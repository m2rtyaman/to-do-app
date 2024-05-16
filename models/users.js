const Sequelize = require('sequelize');
const db = require("../database/database");
const hash = require("../hash/hash");

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
}, { timestamps: true });

User.beforeCreate(async (instance) => {
    if (instance.password) {
        instance.password = await hash(instance.password);
    }
});

module.exports = User;
