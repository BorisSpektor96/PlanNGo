import express from "express";
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

userBusinessRouter.post("/newBusinessUser", async (req, res) => {
  const {
    email,
    password,
    fullname,
    phoneNumber,
    isBusiness,
    userType,
    address,
    business_name,
    business_description,
    businessType,
    services,
    products,
    profileImg,
    reviews,
    appointmentsDef
  } = req.body;

  const newBusinessUser = new userBusinessModel({
    email,
    password,
    fullname,
    phoneNumber,
    isBusiness,
    userType,
    address,
    business_name,
    business_description,
    businessType,
    services,
    products,
    profileImg,
    reviews,
    appointmentsDef
  });

  try {
    const savedUser = await newBusinessUser.save();
    res.status(200).json({ user: savedUser, message: "Business register Succesfully", type: "Success" });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Business register Succesfully", type: "Success" });
  }
});

userBusinessRouter.post("/markAs", async (req, res) => {
  const { email, id, read } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email }).select({ messages: 1 });

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

userBusinessRouter.post("/getMessages", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email }).select({ messages: 1 });

    if (!user || !user.messages) {
      return res.status(404).json();
    }
    console.log(user.messages)
    res.status(200).json({ message: "Message marked as read successfully", type: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, type: "Error" });
  }
});

userBusinessRouter.post("/removeMessage", async (req, res) => {
  const { email, id } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email }).select({ messages: 1 });

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
        message: "Message not found for the given business id",
        type: "Error"
      });
    }
    console.log(user.messages[ messagesIndex ])

    user.messages.splice(messagesIndex, 1);
    await user.save();

    res.status(200).json({ message: "Message removed successfully", type: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, type: "Error" });
  }
});

userBusinessRouter.post('/getBusinessProfile', async (req, res) => {
  const { email } = req.body
  const user = await userBusinessModel.findOne({ email: email })
  try {
    res.json(user);
  } catch (err) {
    res.send("Error " + err);
  }
});

userBusinessRouter.post('/updateBusinessProfile', async (req, res) => {
  const { email, fullname, emailNew, business_name, address, phoneNumber, business_description } = req.body
  const user = await userBusinessModel.findOne({ email: email })
  user.fullname = fullname
  user.email = emailNew
  user.business_name = business_name
  user.address = address
  user.phoneNumber = phoneNumber
  user.business_description = business_description

  user.save()

  try {
    res.json({ user: user, message: "Profile Updated Succesfully", type: "Success" });
  } catch (error) {
    res.json({ error: error, message: "Profile Not Updated ", type: "Error" });
  }
});

userBusinessRouter.post("/addReviewToBusiness", async (req, res) => {
  const { email, reviewer, date, content, rating } = req.body
  const user = await userBusinessModel.findOne({ email: email });
  try {
    if (user) {
      user.reviews.push({ reviewer, date, content, rating });
      await user.save();

      res.status(200).json({ message: "Review added successfully", type: "Success" });
    } else {
      res.status(400).json({ message: "Review Not Added / User not found", type: "Warning" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error adding review", error: error, type: "Error" });
  }
});

userBusinessRouter.post('/getBusinessServices', async (req, res) => {
  const { email } = req.body
  const user = await userBusinessModel.findOne({ email: email }).select('services')
  try {
    return res.json(user.services);
  } catch (err) {
    res.send("Error " + err);
  }
});

userBusinessRouter.post('/addService', async (req, res) => {
  const { email, service } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.services.push(service);
    await user.save();
    res.status(200).json({ message: 'Service added successfully', type: "Success" });

  } catch (error) {
    res.status(500).json({ message: 'Failed to add service', error });
  }
});

userBusinessRouter.post('/deleteService', async (req, res) => {
  const { email, serviceId } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found', type: "Error" });
    }
    const serviceIndex = user.services.findIndex(service => service._id.oid === serviceId);
    if (serviceIndex === -1) {
      return res.status(404).json({ message: 'Service not found', type: "Error" });
    }
    user.services.splice(serviceIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Service deleted successfully', type: "Info" });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error });
  }
});

userBusinessRouter.post('/getBusinessProducts', async (req, res) => {
  const { email } = req.body
  const user = await userBusinessModel.findOne({ email: email }).select('products')
  try {
    res.json(user.products);
  } catch (err) {
    res.send("Error " + err);
  }
});

userBusinessRouter.post('/addProduct', async (req, res) => {
  const { email, product } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found', type: "Error" });
    }
    user.products.push(product);

    await user.save();
    res.status(200).json({ message: 'Product added successfully', type: "Success" });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add Product', error: error, type: "Error" });
  }
});

userBusinessRouter.post('/deleteProduct', async (req, res) => {
  const { email, productId } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const productIndex = user.products.findIndex(product => product.productId == productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found', type: "Error" });
    }
    user.products.splice(productIndex, 1);

    await user.save();
    res.status(200).json({ message: 'Product deleted successfully', type: "Info" });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Product', error: error, type: "Error" });
  }
});

userBusinessRouter.post("/addMessage", async (req, res) => {
  const { email, mmessage } = req.body;
  try {
    const user = await userBusinessModel.findOneAndUpdate(
      { email: email },
      { $push: { "messages": mmessage } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User/Business not found", type: "Error" });
    }

    res.status(200).json({ message: "message added successfully", type: "Success" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Failed to add message", error });
  }
});

userBusinessRouter.post("/addAppointment", async (req, res) => {
  const { email, appointment } = req.body;
  console.log(appointment.date)
  try {
    const user = await userBusinessModel.findOneAndUpdate(
      { email: email },
      { $push: { "appointmentsDef.0.appointments": appointment } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User/Business not found", type: "Error" });
    }

    res.status(200).json({ message: "Appointment added successfully", type: "Success" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Failed to add appointment", error });
  }
});

userBusinessRouter.post("/getAppointmentsDetails", async (req, res) => {
  const { email } = req.body
  try {
    const user = await userBusinessModel.findOne({ email: email })
    if (!user) {
      return res.status(404).json({ message: "User / Appointments not found", type: "Error" });
    }

    res.status(200).json(user.appointmentsDef[ 0 ].appointments)
  } catch (error) {
    res.status(500).json({ message: error, type: "Error" })
  }
})

userBusinessRouter.post("/getAppointmentsDef", async (req, res) => {
  const { email } = req.body
  try {
    const user = await userBusinessModel.findOne({ email: email })
    if (!user) {
      return res.status(404).json({ message: "User not found", type: "Error" });
    }

    res.status(200).json(user.appointmentsDef[ 0 ])
  } catch (error) {
    res.status(500).json({ message: error, type: "Error" })
  }
})


userBusinessRouter.post("/removeAppointment", async (req, res) => {
  const { businessEmail, date, userEmail } = req.body;
  console.log("================= business ===================")
  console.log(userEmail, date, businessEmail)
  try {
    const user = await userBusinessModel.findOne({ email: businessEmail });

    if (!user) {
      return res.status(404).json({
        message: "User / Appointments not found",
        type: "Error"
      })
    }
    const appointmentIndex = user.appointmentsDef[ 0 ].appointments.findIndex(appointment =>
      appointment.userDetails.email === userEmail
      &&
      appointment.date === date
    );

    if (appointmentIndex === -1) {
      return res.status(404).json({
        message: "Appointment not found for the given business and date",
        type: "Error"
      });
    }

    console.log(user.appointmentsDef[ 0 ].appointments[ appointmentIndex ])
    user.appointmentsDef[ 0 ].appointments.splice(appointmentIndex, 1)
    console.log(appointmentIndex)
    console.log(user.appointmentsDef[ 0 ].appointments)
    await user.save()

    res.status(200).json({ message: "Appointment removed successfully", type: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message, type: "Error" });
  }
});



export default userBusinessRouter;
