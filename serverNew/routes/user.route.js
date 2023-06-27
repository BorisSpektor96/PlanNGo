import express from "express";
// import db from "../configuration/mongodb.js";
import userModel from '../models/User.js'

const userRouter = express.Router();
// const usersDB = db.collection("users")

userRouter.post('/signup', async (req, res) => {
  try {
    const user = new userModel({
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
    });
    const result = await user.create();
    return res.status(200).json(result);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ ok: false, error: 'duplicate' });
    }
    return res.status(400).send(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedUser = await userModel.findOne({ email: email, password: password });
    res.json(loggedUser);
  } catch (err) {
    res.send("Error " + err);
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
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  }
  try {
    const result = await userModel.create(newUser);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

export default userRouter;
