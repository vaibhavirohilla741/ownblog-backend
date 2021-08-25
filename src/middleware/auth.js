const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log("herre");
  const token = req.body.token;
  console.log("token: ", token);
  try {
    jwt.verify(token, "auth", (err, decoded) => {
      if (err) {
        res.status(500).send({ error: "Something went wrong" + err });
      } else {
        console.log("decoded: ", decoded);
        req.user = decoded.id;
        next();
      }
    });
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
