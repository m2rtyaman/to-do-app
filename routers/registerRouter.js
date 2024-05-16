const User = require("../models/users");
const Todos = require("../models/todos");
const registerPostRouter = async (req, res) => {
    try {
        await User.create(req.body);
        res.redirect("login");

    } catch (err) {
        console.error(err);
        res.status(500).send("Kullanıcı oluşturulurken bir hata oluştu.");
    }
};
const registerGetRouter = (req, res) => {
    res.render("register");
};
module.exports = {
    registerPostRouter,
    registerGetRouter,
}