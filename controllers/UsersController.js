const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post("/whoami", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post("/", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      res.json(data);
      res.status(201);
    })
    .catch((err) => {
      if (err && err.code !== 11000) {
        res.json({ error: "Another error showed up" });
      }

      //duplicate key
      if (err && err.code === 11000) {
        res.json({ error: "User already exists" });
      }
    });
});

router.put("/:userId", (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.delete("/:userId", (req, res) => {
  User.findByIdAndDelete(req.params.userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
