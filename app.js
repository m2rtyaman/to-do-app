if (process.env.NODE_ENV != "production") { 
    require("dotenv").config();
}
const express = require("express");
const path = require("path");
const app = express();
const database = require("./database/database");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const authMiddleware = require("./middlewares/authMiddleware")
const cookieParser = require("cookie-parser");
const loginRouter = require("./routers/loginRouter")
const indexRouter = require("./routers/indexRouter")
const registerRouter = require("./routers/registerRouter");

const jwt = require("jsonwebtoken");

const { requireAuth } = require('./middlewares/authMiddleware');

app.set("view engine", "ejs")

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

const verificationCode = generateVerificationCode();

app.use(express.json());

// DATABASE BAĞLANTISI
database.authenticate().then(() => { console.log("Database bağlanıldı"); }).catch(err => { console.error("Database bağlantı hatası:", err); });

app.get("/", authMiddleware.requireAuth, indexRouter.indexGetRouter);
app.get("/logout", loginRouter.logOutRouter);

app.get("/register", registerRouter.registerGetRouter);

app.get("/login", loginRouter.loginGetRouter);

app.post("/login/dogrula", loginRouter.loginDogrulaPostRouter);

app.post("/to-do-app/post", authMiddleware.requireAuth, indexRouter.indexPostRouter)

app.post("/to-do-app/delete", authMiddleware.requireAuth, indexRouter.indexDeleteRouter)

app.post("/login", loginRouter.loginPostRouter);

app.post("/register", registerRouter.registerPostRouter);

app.get("/index", indexRouter.indexRedirectRouter);

app.use((req, res) => {
    res.render("404");
})
app.listen(3000, () => {
    console.log("3000 portunda çalışıyor");
});
