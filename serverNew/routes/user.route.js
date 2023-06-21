import express from "express";
// import db from "../configuration/mongodb.js";
import userModel from '../models/User.js'

const userRouter = express.Router();
// const usersDB = db.collection("users")

userRouter.post('/signup', async (req, res) => {
  try {
    const user = new userModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
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

userRouter.get("/getAllUsers", async (req, res) => {
  try {
    const allUsers = await userModel.find({});
    res.json(allUsers);
  } catch (err) {
    res.send("Error " + err);
  }
});

userRouter.post("/newUser", async (req, res) => {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
  };
  const result = await users.insertOne(user);
  res.status(200).json(result);
});

export default userRouter;
