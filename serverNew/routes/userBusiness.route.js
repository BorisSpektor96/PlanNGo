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
    address,
    business_name,
    business_description,
    businessType,
    services,
    products,
    profileImg,
    reviews,
    appointmentsDef,
    securityQuestion
  } = req.body;

  const newBusinessUser = new userBusinessModel({
    email,
    password,
    fullname,
    phoneNumber,
    isBusiness,
    address,
    business_name,
    business_description,
    businessType,
    services,
    products,
    profileImg,
    reviews,
    appointmentsDef,
    securityQuestion
  });

  try {
    const savedUser = await newBusinessUser.save();
    res.status(200).json({ ok: true, user: savedUser, message: "Business registered Succesfully", type: "Success" });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message, type: "Error" });
  }
});

userBusinessRouter.post("/incrementProductQuantity", async (req, res) => {
  const { email, increment, productId } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email })

    if (!user || !user.messages) {
      return res.status(404).json();
    }
    const productIndex = user.products.findIndex(product => product.productId === productId);

    const product = user.products[ productIndex ]
    product.quantity += increment
    await user.save()

    res.status(200).json({ message: "Message marked as read successfully", type: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, type: "Error" });
  }
});

userBusinessRouter.post("/incrementProductQuantityArray", async (req, res) => {
  const { email, productsArray } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email });

    if (!user || !user.products) {
      return res.status(404)
    }

    productsArray.forEach((product) => {
      const existingProduct = user.products.find(p => p.productId === product.productId);

      if (existingProduct) {
        existingProduct.quantity += product.amount;
      }
    });
    await user.save();

    res.status(200).json({ message: "Product quantities incremented successfully", type: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, type: "Error" });
  }
});

userBusinessRouter.post("/decrementProductQuantity", async (req, res) => {
  const { email, decrement, productId } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email })

    if (!user || !user.messages) {
      return res.status(404).json();
    }
    const productIndex = user.products.findIndex(product => product.productId === productId);

    const product = user.products[ productIndex ]
    if (product.quantity > 0) {
      product.quantity -= decrement
    }
    await user.save()

    res.status(200).json({ message: "Message marked as read successfully", type: "Success" });
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
  const { email, reviewer, date, content, rating, userEmail } = req.body
  const user = await userBusinessModel.findOne({ email: email });
  try {
    if (user) {
      user.reviews.push({ reviewer, date, content, rating, userEmail });
      await user.save();

      res.status(200).json({ reviews: user.reviews, message: "Review added successfully", type: "Success" });
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
    res.status(200).json({ services: user.services, message: 'Service added successfully', type: "Success" });

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
    const serviceIndex = user.services.findIndex(service => service.serviceId === serviceId);
    if (serviceIndex === -1) {
      return res.status(404).json({ message: 'Service not found', type: "Error" });
    }
    user.services.splice(serviceIndex, 1);
    await user.save();

    res.status(200).json({ services: user.services, message: 'Service deleted successfully', type: "Info" });
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
    res.status(200).json({ products: user.products, message: 'Product added successfully', type: "Success" });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add Product', error: error, type: "Error" });
  }
});

userBusinessRouter.post('/deleteProduct', async (req, res) => {
  const { email, productId } = req.body;
  console.log(productId)
  try {
    const user = await userBusinessModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const productIndex = user.products.findIndex(product => product.id === productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found', type: "Error" });
    }
    user.products.splice(productIndex, 1);

    await user.save();
    res.status(200).json({ products: user.products, message: 'Product deleted successfully', type: "Info" });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Product', error: error, type: "Error" });
  }
});

userBusinessRouter.post("/addMessage", async (req, res) => {
  const { email, message } = req.body;
  try {
    const user = await userBusinessModel.findOneAndUpdate(
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

userBusinessRouter.post("/addAppointment", async (req, res) => {
  const { email, appointment } = req.body;
  try {
    const user = await userBusinessModel.findOneAndUpdate(
      { email: email },
      { $push: { "appointmentsDef.appointments": appointment } },
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

userBusinessRouter.post("/removeAppointment", async (req, res) => {
  const { userEmail, businessEmail, date, type } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: businessEmail });
    if (!user) {
      return res.status(404).json({
        message: "User / Appointments not found",
        type: "Error"
      })
    }
    let appointmentIndex = -1
    if (type === 'lock') {
      appointmentIndex = user.appointmentsDef.appointments.findIndex(appointment =>
        appointment.date === date &&
        appointment.type === 'lock' &&
        appointment.userDetails.email === userEmail
      );
    }
    else {
      appointmentIndex = user.appointmentsDef.appointments.findIndex(appointment =>
        appointment.date === date &&
        appointment.userDetails.email === userEmail
      );
    }
    if (appointmentIndex === -1) {
      return res.status(404).json({
        message: "Appointment not found for the given business and date",
        type: "Error"
      });
    }
    user.appointmentsDef.appointments.splice(appointmentIndex, 1)
    await user.save()

    res.status(200).json({ appointments: user.appointmentsDef.appointments, message: "Appointment removed successfully", type: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message, type: "Error" });
  }
});


userBusinessRouter.post("/getAppointmentsDetails", async (req, res) => {
  const { email } = req.body
  try {
    const user = await userBusinessModel.findOne({ email: email })
    if (!user) {
      return res.status(404).json({ message: "User / Appointments not found", type: "Error" });
    }

    res.status(200).json(user.appointmentsDef.appointments)
  } catch (error) {
    res.status(500).json({ message: error, type: "Error" })
  }
})

userBusinessRouter.post("/updateAppointmentsDef", async (req, res) => {
  const { email, newAppointmentsDef } = req.body
  try {
    const user = await userBusinessModel.findOne({ email: email })
    if (!user) {
      return res.status(404).json({ message: "User / AppointmentsDef not found", type: "Error" });
    }
    user.appointmentsDef = newAppointmentsDef
    await user.save()

    res.status(200).json({ appointmentsDef: user.appointmentsDef, message: "updated calendar times", type: "Info" })
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

    res.status(200).json(user.appointmentsDef)
  } catch (error) {
    res.status(500).json({ message: error, type: "Error" })
  }
})

export default userBusinessRouter;