import express from "express";
// import db from "../configuration/mongodb.js";
import userBusinessModel from '../models/BusinessUser.js'

const userBusinessRouter = express.Router();

userBusinessRouter.get("/getAllUsersBusiness", async (req, res) => {
  try {
    const businessUsers = await userBusinessModel.find({ isBusiness: true });
    return res.json(businessUsers);
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

userBusinessRouter.post("/addReviewToBusiness", async (req, res) => {
  const { email, Rname, Rating_date, Rcontent, rating } = req.body

  const user = await userBusinessModel.findOne({ email: email });
  try {
    if (user) {
      user.reviews.push({ Rname, Rating_date, Rcontent, rating });
      await user.save();

      res.status(200).json({ message: "Review added successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error adding review", error });
  }
});

export default userBusinessRouter;
