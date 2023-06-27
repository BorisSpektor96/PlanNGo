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
  business_photo_gallery: [],
  reviews: [
    {
      reviewer: String,
      date: String,
      content: String,
      rating: Number
    }
  ]
},
  { collection: 'users', versionKey: false },
);

const userBusinessModel = mongoose.model('Business', businessSchema);

export default userBusinessModel;