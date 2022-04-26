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
          name: {$in: req.body.roles}
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

            res.send({message: "Use successfully registered."});
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
  const userLoggingIn = req.body;

  // TODO switching between email and username is confusing.
  User.findOne({email: userLoggingIn.username})
    .then(dbUser => {
      if (!dbUser) {
        return res.status(404).send({message: "Username (or email) not found"})
      }
      bcrypt.compare(userLoggingIn.password, dbUser.password)
        .then(isCorrect => {
          if (isCorrect) {
            const payload = {
              id: dbUser._id,
              username: dbUser.username
            }
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {expiresIn: 86400},
              (err, token) => {
                if (err) return res.status(500).send({message: err})
                return res.json({
                  message: "Success",
                  token: "Bearer " + token
                })
              }
            )
          } else {
            return res.status(404).send({message: "Invalid username or password dude."})
          }
        })
    })
}
