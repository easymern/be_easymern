const router = require("express").Router();
const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

router
  .route("/home")
  .get(
    (req, res) => {
      res.json({
        name: "Bill",
        age: 99
      })
    }
  )

module.exports = router;

// module.exports = function(app) {
//   console.log("we here");
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });
//
//   app.get("/home", (req, res) => {
//     res.json({
//       name: "Bill",
//       age: 99
//     })
//   })
//
//   app.post(
//     "/register",
//     async (req, res) => {
//     console.log("made it here at least");
//     const user = req.body;
//
//     // Check if username or email has been taken by another user already
//     const takenUsername = await User.findOne({username: user.username})
//     const takenEmail = await User.findOne({email: user.email})
//
//     // TODO drop this into the controller file (and import)
//     if (takenUsername || takenEmail ) {
//       res.json({message: "Username or email has already been taken"})
//     } else {
//       user.password = await bcrypt.hash(req.body.password, 10)
//
//       const dbUser = new User({
//         username: user.username.toLowerCase(),
//         email: user.email.toLowerCase(),
//         password: user.password
//       })
//
//       await dbUser.save()
//       res.json({message: "Success homie"})
//     }
//   })
// }
