import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    fullname: String,
    personal_phone: String,
    isBusiness: Boolean,
    userType: String,
    address: String,
    business_name: String,
    business_phone: String,
    businessType: String,
    business_description: String,
    services: Array,
    products: Array,
    business_photo_gallery: Array,
    reviews: Array
  },
  { collection: "users", versionKey: false }
);

const userBusinessModel = mongoose.model('Business', businessSchema);

export default userBusinessModel;