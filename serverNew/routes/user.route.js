import express from "express";
import db from "../configuration/mongodb.js";
import User from '../models/User.js'

const router = express.Router();
const usersDB = db.collection("users")

router.post('/signup', async (req, res) => {
  try {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      gender: req.body.gender,
    });
    await user.save();
    return res.status(201).json({ ok: true, uid: user.id });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ ok: false, error: 'duplicate' });
    }
    return res.status(400).json({ ok: false });
  }
});


router.get("/users", async (req, res) => {
  try {
    const allUsers = [];
    const users = await usersDB.find({}).sort({ _id: -1 });
    // const users = await usersDB.find({ business: true }).sort({ _id: -1 });
    //can the result
    await users.forEach((user) => {
      // if (!user.business) {
      allUsers.push(user);
      // }
    });
    res.json(allUsers);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/newUser", async (req, res) => {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
  };
  const result = await users.insertOne(user);
  res.status(200).json(result);
});

export default router;
