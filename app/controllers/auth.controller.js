const db = require("../models");
const User = db.User;
const Role = db.Role

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  //  Create user object and save
  const dbUser = await new User({
    username: req.body.username.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: bcrypt.hashSync(req.body.password, 8)
  });

  dbUser.save((err, dbUser) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: {$in: req.body.roles.toLowerCase()}
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({message: err});
            return;
          }

          dbUser.roles = roles.map(role => role._id);
          dbUser.save(err => {
            if (err) {
              res.status(500).send({message: err});
              return;
            }

            res.send({message: "User successfully registered."});
          });
        }
      );
    } else {
      Role.findOne({name: "user"}, (err, role) => {
        if (err) {
          res.status(500).send({message: err});
          return;
        }

        dbUser.roles = [role._id];
        dbUser.save(err => {
          if (err) {
            res.status(500).send({message: err});
            return;
          }

          res.send({message: "User successfully registered."});
        });
      });
    }
  });
};

exports.login = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }

      if (!user) {
        return res.status(404).send({message: "User not found."});
      }

      let passwordCheck = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordCheck) {
        return res.status(401).send({accessToken: null, message: "Invalid password"});
      }

      let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: 86400
      });

      let authorities = []

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
      console.log("token: ", token);
    });
};
