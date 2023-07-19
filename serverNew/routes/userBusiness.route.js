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
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
userBusinessRouter.post('/getBusinessProfile', async (req, res) => {
  const { email } = req.body
  const user = await userBusinessModel.findOne({ email: email })
  try {
    return res.json(user);
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
    return res.json(user);
  } catch (err) {
    res.send("Error " + err);
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
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error adding review", error });
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

    res.status(200).json({ message: 'Service added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add service', error });
  }
});

userBusinessRouter.post('/deleteService', async (req, res) => {
  const { email, serviceId } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const serviceIndex = user.services.findIndex(service => service._id.oid === serviceId);
    if (serviceIndex === -1) {
      return res.status(404).json({ message: 'Service not found' });
    }
    user.services.splice(serviceIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error });
  }
});

userBusinessRouter.post('/getBusinessProducts', async (req, res) => {
  const { email } = req.body
  const user = await userBusinessModel.findOne({ email: email }).select('products')
  try {
    return res.json(user.products);
  } catch (err) {
    res.send("Error " + err);
  }
});

userBusinessRouter.post('/addProduct', async (req, res) => {
  const { email, product } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.products.push(product);

    await user.save();
    res.status(200).json({ message: 'Service added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add service', error });
  }
});

userBusinessRouter.post('/deleteProduct', async (req, res) => {
  const { email, productId } = req.body;
  try {
    const user = await userBusinessModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const productIndex = user.products.findIndex(product => product.id == productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    user.products.splice(productIndex, 1);

    await user.save();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete Product', error });
  }
});

export default userBusinessRouter;
