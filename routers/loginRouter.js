const User = require("../models/users");
const bcrypt = require("bcrypt")
const token = require("../token/token")
const loginGetRouter = (req, res) => {
    res.render("login");
};
const loginPostRouter = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        const userID = user.id;
        console.log(userID);
        if (user) {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (passwordMatch) {
                // sendEmail.mailOptions.to = await user.email;
                // sendEmail.mailOptions.text = await `Hesabınıza Giriş Yapıldı Doğrulama koduunz: ${verificationCode} `;

                // sendEmail.mailOptions.html = await `<b>Hesabınıza Giriş Yapıldı Doğrulama koduunz: ${verificationCode} </b>`;
                // sendEmail.sendMail(sendEmail.transporter, sendEmail.mailOptions);
                token.createSessionToken(userID, res)


                res.redirect("/")
            } else {
                console.log("şifreniz yanlış");
            }
        } else {
            console.log("kullanıcı bulunamadı")
        }
    }
    catch (err) {
        console.log(`GİRİŞ YAPMA HATASI: ${err}`);
    }
};
const logOutRouter = (req, res) => {
    res.cookie("sessionid", "", { maxAge: "0" });
    res.redirect("/login");
}
const loginDogrulaPostRouter = async (req, res) => {
    try {
        const { verificationCode } = req.body;
        if (verificationCode !== verificationCode) {
            return res.status(400).json({ error: "Doğrulama kodu hatalı." });
        }

        res.redirect("/");
    } catch (err) {
        console.error(`Doğrulama Hatası: ${err}`);
        res.status(500).json({ error: "Doğrulama sırasında bir hata oluştu." });
    }
};
const loginDogrulaGetRouter = (req, res) => {
    res.render("dogrula");
};
module.exports = {
    loginGetRouter,
    loginPostRouter,
    loginDogrulaPostRouter,
    loginGetRouter,
    loginDogrulaGetRouter,
    logOutRouter,
}