const Sequelize = require('sequelize');
const db = require("../database/database");
const User = require("./users");

const Todo = db.define('todos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userid: {
        type: Sequelize.TEXT,
        allowNull: false, 
    },
    content: Sequelize.TEXT,
}, { timestamps: true });


module.exports = Todo;
