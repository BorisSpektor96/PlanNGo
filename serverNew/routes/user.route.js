import express from "express";
import userModel from '../models/User.js'
import userBusinessModel from '../models/BusinessUser.js'

const userRouter = express.Router();

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

userRouter.post("/getFavorites", async (req, res) => {
  const { email } = req.body;
  try {
    const { favorites } = await userModel.findOne({ email: email }, { favorites: 1 });
    if (favorites) {
      console.log(favorites);
      res.json(favorites);
    } else {
      console.log("Favorites not found");
      res.json([]);
    }
  } catch (err) {
    res.send("Error " + err);
  }
});

userRouter.post('/addToFavorite', async (req, res) => {
  try {
    const { userEmail, businessEmail } = req.body
    console.log(userEmail)
    console.log(businessEmail)
    const business = await userBusinessModel.findOne({ email: businessEmail })
    const user = await userModel.findOne({ email: userEmail })
    const favBusiness = {
      business_name: business.business_name,
      email: business.email,
      businessType: business.business_type
    }
    user.favorites.push(favBusiness)
    user.save()
    res.json(favBusiness)
  } catch (err) {
    res.send("Error " + err)
  }
})

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedUser = await userModel.findOne({ email: email, password: password });
    res.json(loggedUser);
  } catch (err) {
    res.send("Error " + err);
  }
});

userRouter.post("/checkEmail", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });

    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
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
