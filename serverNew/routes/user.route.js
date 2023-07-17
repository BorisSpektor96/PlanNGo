import express from "express";
import userModel from '../models/User.js'
import userBusinessModel from '../models/BusinessUser.js'
import { v4 as uuidv4 } from 'uuid';
import multer from "multer";

const userRouter = express.Router();


const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

userRouter.post('/signup', upload.single('profileImg'), async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const { email, password, fullName, phoneNumber, userType, isBusiness } = req.body;

  try {
    const user = await userModel.create({
      email,
      password,
      fullName,
      phoneNumber,
      profileImg: url + '/public/' + req.file.filename,
      userType,
      isBusiness,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
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
    console.log(business._id.toString())
    const favBusiness = {
      id: business._id.toString(),
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

userRouter.post('/deleteFromFavoriteById', async (req, res) => {
  try {
    const { userEmail, favoriteId } = req.body;
    const user = await userModel.findOne({ email: userEmail });

    const favoriteIndex = user.favorites.findIndex(favorite => favorite.id === favoriteId);

    if (favoriteIndex !== -1) {
      user.favorites.splice(favoriteIndex, 1);
      await user.save();
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Error deleting favorite: " + err });
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

// userRouter.post("/getUserByEmail", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await userModel.findOne({ email: email });

//     if (user) {
//       // User with the specified email found in the database
//       res.json(user);
//     } else {
//       // User with the specified email not found in the database
//       res.json(null);
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// userRouter.post("/checkEmail", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await userModel.findOne({ email: email });

//     if (user) {
//       res.json({ exists: true });
//     } else {
//       res.json({ exists: false });
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });