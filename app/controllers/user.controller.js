exports.allAccess = (req, res) => {
  res.status(200).send({message: "public content"});
}

exports.userBoard = (req, res) => {
  res.status(200).send({message: "user content"});
}

exports.adminBoard = (req, res) => {
  res.status(200).send({message: "admin content"});
}

exports.moderatorBoard = (req, res) => {
  res.status(200).send({message: "mod content"});
}

// Simple check for admin
exports.isAdmin = (req, res) => {
  console.log(200)
  res.status(200)
}
