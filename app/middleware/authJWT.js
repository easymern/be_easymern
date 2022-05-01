const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const Role = db.Role;


const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({message: "No token provided."});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // console.log("error confirming token")
      return res.status(401).send({message: "Unauthorised."});
    }
    // console.log("token confirmed")
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  console.log(req.userId)
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({message: err });
      return;
    }

    Role.find(
      {
        _id: {$in: user.roles}
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({message: err});
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          // TODO replace with constant.
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({message: "Admin required."});
      });
  });
};

const isModerator = (req, res, next) => {
  // TODO merge with above. DRY!
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({message: err });
      return;
    }

    Role.find(
      {
        _id: {$in: user.roles}
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({message: err});
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          // TODO replace with constant.
          if (roles[i].name === "moderator" || roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({message: "Moderator required."});
      });
  });
};

const authJWT = {
  verifyToken,
  isAdmin,
  isModerator
};

module.exports = authJWT;
