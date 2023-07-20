import express from "express";
import userModel from '../models/User.js'
import userBusinessModel from '../models/BusinessUser.js'

const userRouter = express.Router();


userRouter.post('/signup', async (req, res) => {
  const { email, password, fullName, phoneNumber, userType, isBusiness, profileImg } = req.body;

  try {
    const user = await userModel.create({
      email,
      password,
      fullName,
      phoneNumber,
      profileImg, // Save the base64 string directly to the profileImg field
      userType,
      isBusiness,
    });

    res.status(200).json({ user: user, message: "Signed Up Succesfully ", type: "Success" });

  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ ok: false, error: 'duplicate' });
    }
    return res.status(400).send(error);
  }
});

userRouter.post('/imgUpdate', async (req, res) => {
  const { email, profileImg } = req.body
  const user = await userModel.findOne({ email: email })
  try {

    user.profileImg = profileImg
    user.save()

    res.json({ user: user, message: "Image Profile Updated Succesfully ", type: "Success" });
  } catch (error) {
    res.json({ error: error, message: "Image Profile Not Updated ", type: "Error" });

  }
})

userRouter.post('/updateUserProfile', async (req, res) => {
  const { email, fullName, emailNew, phoneNumber } = req.body
  const user = await userModel.findOne({ email: email })

  try {
    user.email = emailNew
    user.fullName = fullName
    user.phoneNumber = phoneNumber
    user.save()

    res.json({ user: user, message: "Profile Updated Succesfully ", type: "Success" });
  } catch (error) {
    res.json({ error: error, message: "Profile Not Updated ", type: "Error" });
    res.send("Error " + err);
  }
});

userRouter.post("/getFavorites", async (req, res) => {
  const { email } = req.body;
  try {
    const { favorites } = await userModel.findOne({ email: email }, { favorites: 1 });
    if (favorites) {
      res.json(favorites);
    } else {
      res.json([]);
    }
  } catch (err) {
    res.send("Error " + err);
  }
});

userRouter.post('/addToFavorite', async (req, res) => {
  try {
    const { userEmail, businessEmail } = req.body
    const business = await userBusinessModel.findOne({ email: businessEmail })
    const user = await userModel.findOne({ email: userEmail })

    const isAlreadyFavorite = user.favorites.some(fav => fav.email === businessEmail);
    if (isAlreadyFavorite) {
      return res.status(200).json({ message: 'Business is already in favorites.', type: "Info" });
    }

    const favBusiness = {
      id: business._id.toString(),
      business_name: business.business_name,
      email: business.email,
      businessType: business.business_type
    }
    user.favorites.push(favBusiness)
    await user.save()
    res.json({ user: user.favorites, message: 'Business Added succesfully favorites.', type: "Success" })
  } catch (err) {
    res.json({ message: 'Error Occurred.', type: "Error" })
    res.send("Error " + err)
  }
})

userRouter.post('/deleteFromFavoriteById', async (req, res) => {
  try {
    const { userEmail, favoriteId } = req.body;
    const user = await userModel.findOne({ email: userEmail });
    const favoriteIndex = user.favorites.findIndex(favorite => favorite.id === favoriteId);

    if (favoriteIndex !== -1) {
      user.favorites.splice(favoriteIndex, 1);
      await user.save();
      res.json({ user: user, message: "Successfully Deleted from Favorites", type: "Info" });
    } else {
      res.json({ message: "Failed To Delete From Favorites Business ", type: "Error" });
    }

  } catch (err) {
    res.status(500).json({ message: "Error ", type: "Error", error: "Error deleting favorite: " + err });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedUser = await userModel.findOne({ email: email, password: password });
    res.json({ user: loggedUser, message: "Login Success", type: "Success" });
  } catch (error) {
    res.json({ error: error, message: "Login Success", type: "Error" });
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

export default userRouter;
