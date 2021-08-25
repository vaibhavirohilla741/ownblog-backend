const express = require("express");
const auth = require("../middleware/auth");
const app = express();
const User = require("../models/user");

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  console.log("user for signup: ", user);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    console.log("user created: ");
    res.status(201).send(token);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/alluser", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.get("/:id", (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.post("/me", auth, async (req, res) => {
  const _id = req.user;
  try {
    const user = await User.findOne({ _id });
    console.log("user: ", user);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    console.log("Logged in user: ", user, token);
    res.status(200).send(token);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/logout", auth, async (req, res) => {
  const _id = req.user;
  try {
    const user = await User.findOne({ _id });
    console.log("user: ", user);
    user.tokens = user.tokens.filter((token) => {
      return token.token !== req.body.token;
    });
    console.log("tokens: ", user.tokens);
    await user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = app;
