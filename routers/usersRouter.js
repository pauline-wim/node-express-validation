const express = require("express");
const router = express.Router();
const Joi = require("Joi");

const users = [
  {
    id: 1,
    username: "Paulette",
    email: "paulette@gmail.com",
    age: 58,
    city: "Paris",
  },
];

const schema = Joi.object({
  id: users.length + 1,
  username: Joi.string().min(4).required(),
  email: Joi.string().email(),
  age: Joi.number().min(2),
  city: Joi.string(),
});

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", (req, res) => {
  const newUser = req.body;
  const validRes = schema.validate(newUser);
  users.push(validRes);
  if (validRes.error) {
    return res.status(400).json({
      message: validRes.error.details[0].message,
    });
  }
  res.json(users);
  console.log("New user added");
});

router.get("/:username", (req, res) => {
  res.json(users);
});

module.exports = router;
