import express from "express";
import db from "../configuration/mongodb.js";
import Business from '../models/BusinessUser.js'

const userBusinessRouter = express.Router();
const usersDB = db.collection("users")

userBusinessRouter.get("/userBusiness", async (req, res) => {
  try {
    const allUsers = [];
    const users = await usersDB.find({}, { isBusiness: true }).sort({ _id: -1 });
    //can the result
    await users.forEach((user) => {
      // if (!user.business) {
      allUsers.push(user);
      // }
    });
    return res.json(allUsers);
  } catch (err) {
    res.send("Error " + err);
  }
});

userBusinessRouter.post("/newUser", async (req, res) => {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
  };
  const result = await users.insertOne(user);
  res.status(200).json(result);
});

export default userBusinessRouter;
