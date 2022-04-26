// Check here for implementing middleware node-js-jwt-auth-mongodb
const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyJWT } = require("./../middlewares");

exports.signup = async (req, res) => {
  const user = req.body;
  const takenUsername = await User.findOne({username: user.username})
  const takenEmail = await User.findOne({email: user.email})

    // Check for duplicates
    if (takenUsername || takenEmail ) {
    res.json({message: "Username or email has already been taken"})
  } else {

    //  Hash the password (lookup hashSync)
    user.password = await bcrypt.hashSync(req.body.password, 10)

    //  Create user object and save
    const dbUser = await new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password
    })

    await dbUser.save()
    res.json({message: "Success homie"})
  }
}

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

// exports.logout = (req, res) => {
//   localStorage.removeItem("token");
//   return res.status(200).send({message: "Logged out dude."})
// }

exports.homeSweetHome = (req, res) => {
  res.json({
    name: "Justin"
  })
}

exports.getUsername = (req, res) => {
  res.json({isLoggedIn: true, username: req.user.username})
}

exports.isUserAuth = (req, res) => {
  res.json({isLoggedIn: true})
}
