const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const app = express();
const Todos = require("../models/todos");
const todoAPI = require("../models/todoAPI");
const GeoIP = require('geoip-lite');
app.use(cookieParser());

const indexRedirectRouter = (req, res) => {
    res.redirect("/");
};
const indexPostRouter = (req, res) => {
    console.log("post isteği geldi");
    const decoded = jwt.verify(req.cookies["sessionid"], "session-id");
    todoAPI.createTodoForUser(decoded.userId, req.body.todoContent)

};
const indexDeleteRouter = (req, res) => {
    const decoded = jwt.verify(req.cookies["sessionid"], "session-id");
    todoAPI.deleteTodo(decoded.userId, req.body.deleteTask)
}


const indexGetRouter = async (req, res) => {
    const decodedSessionId = jwt.verify(req.cookies["sessionid"], "session-id");
    Todos.findAll({ where: { userid: (decodedSessionId.userId).toString() } })
        .then(todos => {
            const listContent = todos.map(todo => {
                return todo.dataValues.content;
            })
            res.render("index", { listContent: listContent });
        })
        .catch(err => {
            console.log(err);
        });
    const geo = await GeoIP.lookup("176.40.245.117");
};
module.exports = {
    indexRedirectRouter,
    indexGetRouter,
    indexPostRouter,
    indexDeleteRouter,
}