import express from "express";
import userModel from '../models/User.js'
import userBusinessModel from '../models/BusinessUser.js'

const userRouter = express.Router();

userRouter.post("/addMessage", async (req, res) => {
  const { email, message } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { email: email },
      { $push: { "messages": message } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User/Business not found", type: "Error" });
    }
    res.status(200).json({ messages: user.messages, message: "message sent successfully", type: "Success" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Failed to sent message", error });
  }
});

userRouter.post("/getMessages", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email }).select({ messages: 1 });

    if (!user || !user.messages) {
      return res.status(404).json();
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, type: "Error" });
  }
});

userRouter.post('/signup', async (req, res) => {
  const { email, password, fullname, phoneNumber, isBusiness, profileImg, securityQuestion } = req.body;

  try {
    const user = await userModel.create({
      email,
      password,
      fullname,
      phoneNumber,
      profileImg,
      isBusiness,
      securityQuestion
    });

    res.status(200).json({ ok: true, user: user, message: "Signed Up Succesfully ", type: "Success" });

  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ ok: false, type: "Error", error: 'duplicate', message: "User already exists. Please use a different email" });
    }
    return res.status(400).send(error);
  }
});


userRouter.post("/addAppointmentToUser", async (req, res) => {
  const { email, appointment } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { email: email },
      { $push: { "appointments": appointment } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found", type: "Error" });
    }
    res.status(200).json({ appointments: user.appointments, message: "Appointment added successfully", type: "Success" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Failed to add appointment", error });
  }
});

userRouter.post("/getAppointmentsDetails", async (req, res) => {
  const { email } = req.body
  try {
    const user = await userModel.findOne({ email: email }).select({ appointments: 1 })
    if (!user) {
      return res.status(404).json({ message: "User / Appointments not found", type: "Error" });
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error, type: "Error" })
  }
})

userRouter.post("/removeAppointment", async (req, res) => {
  const { userEmail, businessEmail, date } = req.body;
  try {
    const user = await userModel.findOne({ email: userEmail }).select({ appointments: 1 })

    if (!user.appointments) {
      return res.status(404).json({
        message: "User / Appointments not found",
        type: "Error"
      });
    }

    const appointmentIndex = user.appointments.findIndex(appointment =>
      appointment.businessDetails.email === businessEmail
      &&
      appointment.date === date
    );

    if (appointmentIndex === -1) {
      return res.status(404).json({
        message: "Appointment not found for the given business and date",
        type: "Error"
      });
    }
    user.appointments.splice(appointmentIndex, 1)
    await user.save()

    res.status(200).json({ appointments: user.appointments, message: "Appointment removed successfully", type: "Success" });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message, type: "Error" });
  }
});

userRouter.post("/removeMessage", async (req, res) => {
  const { email, id } = req.body;
  try {
    const user = await userModel.findOne({ email: email }).select({ messages: 1 });

    if (!user || !user.messages) {
      return res.status(404).json({
        message: "User / Messages not found",
        type: "Error"
      });
    }

    const messagesIndex = user.messages.findIndex((message) =>
      message.id === id
    );

    if (messagesIndex === -1) {
      return res.status(404).json({
        message: "Message not found for the given user id",
        type: "Error"
      });
    }

    user.messages.splice(messagesIndex, 1);
    await user.save();

    res.status(200).json({ message: "Message removed successfully", type: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, type: "Error" });
  }
});

userRouter.post("/markAs", async (req, res) => {
  const { email, id, read } = req.body;
  try {
    const user = await userModel.findOne({ email: email }).select({ messages: 1 });

    if (!user || !user.messages) {
      return res.status(404).json({
        message: "User / Messages not found",
        type: "Error"
      });
    }

    const message = user.messages.find((message) =>
      message.id === id
    );

    if (!message) {
      return res.status(404).json({
        message: "Message not found for the given business and date",
        type: "Error"
      });
    }

    message.read = read;

    await user.save();

    res.status(200).json({ message: "Message marked as read successfully", type: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, type: "Error" });
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
  const { email, fullname, emailNew, phoneNumber } = req.body
  const user = await userModel.findOne({ email: email })
  try {
    user.email = emailNew
    user.fullname = fullname
    user.phoneNumber = phoneNumber
    user.save()

    res.json({ user: user, message: "Profile Updated Succesfully ", type: "Success" });
  } catch (error) {
    res.json({ error: error, message: "Profile Not Updated ", type: "Error" });
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

    user.favorites.push(business)
    await user.save()
    res.json({ favorites: user.favorites, message: 'Business Added succesfully favorites.', type: "Success" })
  } catch (err) {
    res.json({ message: 'Error Occurred.', type: "Error" })
    res.send("Error " + err)
  }
})

userRouter.post('/deleteFromFavorite', async (req, res) => {
  try {
    const { userEmail, businessEmail } = req.body;
    const user = await userModel.findOne({ email: userEmail });
    const favoriteIndex = user.favorites.findIndex(fav => fav.email === businessEmail);

    if (favoriteIndex !== -1) {
      user.favorites.splice(favoriteIndex, 1);
      await user.save();
      res.status(200).json({ favorites: user.favorites, message: "Successfully Deleted from Favorites", type: "Info" });
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
    if (!loggedUser) {
      return res.status(404).json({
        message: "Bad Login Information",
        type: "Error"
      });
    }
    res.status(200).json({ user: loggedUser, message: "Login Success", type: "Success" });
  } catch (error) {
    res.json({ error: error, message: "Login Success", type: "Error" });
  }
});

userRouter.post("/checkEmail", async (req, res) => {

  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });

    if (user) {
      res.json({ exists: true, user: user });
    } else {
      res.json({ exists: false });

    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post('/updatePassword', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (user) {
      user.password = password;
      await user.save();

      res.json({ success: true, message: 'Password updated successfully', type: 'Info' });
    } else {
      res.json({ success: false, message: 'User not found', type: 'Error' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
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