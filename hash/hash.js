const bcrypt = require("bcrypt");

const hash = (password) => {
    return bcrypt.hashSync(password.toString(), 16)
}
module.exports = hash;