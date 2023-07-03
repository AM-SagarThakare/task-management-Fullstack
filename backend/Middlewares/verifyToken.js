const jwt = require("jsonwebtoken");
const dotenv = require('dotenv/config')

// verify customers token
const verifyToken = (req, res, next) => {
  if (req.headers.authorization == undefined)
    return res.status(401).send({ message: 'user not authorised' })

  const authHeader = req.headers.authorization.split(" ")[1];

  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRETKEY, (err, user) => {
      if (err) {
        return res.status(403).send({ message: err.message });
      }

      req.user_id = user.id;

      next();
    });
  } else {
    res.send(401).json({ message: "user not authorized " });
  }
};

module.exports = { verifyToken };
