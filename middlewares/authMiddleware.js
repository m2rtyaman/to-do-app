const express = require("express")
const jwt = require("jsonwebtoken");

const requireAuth =  (req, res, next) => {
    const sessionid = req.cookies.sessionid; // 'sessionid' çerezinden belirteci alın
    if (sessionid) {
        jwt.verify(sessionid, 'session-id', (err, decoded) => {
            if (err) {
                console.log(err)
                res.redirect('/login')
            } else {
                console.log(decoded)
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

module.exports = { requireAuth }   