const express = require("express");
const router = express.Router();
const Joi = require("Joi");

const users = [
  {
    username: "Paulette",
    email: "paulette@gmail.com",
    age: 58,
    city: "Paris",
  },
  {
    username: "Jean",
    email: "jean@gmail.com",
    age: 65,
    city: "Paris",
  },
];

const schema = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(10).max(160).required(),
  city: Joi.string().required(),
});

// Get all users
router.get("/", (_req, res) => {
  res.json(users);
});

// Add user to list users
router.post("/", (req, res) => {
  const newUser = req.body;
  const validRes = schema.validate(newUser);
  if (validRes.error) {
    return res.status(400).json({
      message: validRes.error.details[0].message,
    });
  } else {
    users.push(newUser);
  }
  res.json(users);
  console.log("New user added");
});

// Get user with username
router.get("/:username", (req, res) => {
  const user = users.find((user) => {
    return req.params.username.toLowerCase() === user.username.toLowerCase();
  });
  res.json(user);
});

// Get user with id
router.get("/id/:id", (req, res) => {
  const user = users[req.params.id - 1];

  if (!user) {
    return res.json({ message: `User ID ${req.params.id} doesn't exist` });
  }

  res.send(user);
});

// Get user with email
router.get("/email/:email", (req, res) => {
  const user = users.find((user) => {
    return req.params.email === user.email;
  });
  res.json(user);
});

module.exports = router;
