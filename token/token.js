const jwt = require("jsonwebtoken");
const createSessionToken = function createToken(userId, res) {
    const sessionid = jwt.sign({ userId: userId }, "session-id", { expiresIn: '1h' });
    res.cookie('sessionid', sessionid, { httpOnly: true });
}

module.exports = {
    createSessionToken,
}//cozdum galiba dene bi