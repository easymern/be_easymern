// const db = require("../models");
// const User = require("../models/user.model");
// const bcrypt = require("bcrypt");
//
// // Defining methods for the user controller.
// // TODO be careful, this HAS been refactored as the auth controller.
//
// module.exports = {
//   create: (req, res) => {
//     db.user.create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err))
//   }
// };
//
//
// // // TODO not enough validation / error handling here.
// // async (req, res) => {
// //   console.log("made it here at least");
// //   const user = req.body;
// //
// //   // Check if username or email has been taken by another user already
// //   const takenUsername = await User.findOne({username: user.username})
// //   const takenEmail = await User.findOne({email: user.email})
// //
// //   // TODO drop this into the controller file (and import)
// //   if (takenUsername || takenEmail ) {
// //     res.json({message: "Username or email has already been taken"})
// //   } else {
// //     user.password = await bcrypt.hash(req.body.password, 10)
// //     console.log("password: ", user.password)
// //
// //     const dbUser = await new User({
// //       username: user.username.toLowerCase(),
// //       email: user.email.toLowerCase(),
// //       password: user.password
// //     })
// //
// //
// //
// //     await dbUser.save()
// //     res.json({message: "Success homie"})
// //   }
// // }