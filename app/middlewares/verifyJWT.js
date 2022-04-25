const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]?.split('')[1]

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return (
        res.status(401).send({
          isLoggedIn: false,
          message: "Failed to authenticate."
        })
      )
      req.user = {};
      req.user.id = decoded.id, req.user.username = decoded.username
      next()
    })
  } else {
    return (
      res.status(406).send({
        isLoggedIn: false,
        message: "Incorrect token."
      })
    )
  }
}

module.exports = verifyJWT;