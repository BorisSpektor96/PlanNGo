import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({

  email: String,
  password: String,
  fullname: String,
  personal_phone: String,
  userType: String,
  address: String,
  business_phone: String,
  business_email: String,
  business_name: String,
  business_description: String,
  isBusiness: Boolean,
  services: [
    {
      serviceType: String,
      name: String,
      price: Number,
      duration: String,
      id: String
    }
  ],
  products: [
    {
      productId: String,
      price: Number,
      description: String,
      name: String,
      quantity: Number,
      photo: String
    }
  ],
  business_photo_gallery: [ String ]
});

const Business = mongoose.model('Business', businessSchema);

// module.exports = Business;
export default Business;