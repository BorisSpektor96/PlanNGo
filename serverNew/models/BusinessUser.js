import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    fullname: String,
    phoneNumber: String,
    isBusiness: Boolean,
    userType: String,
    address: String,
    business_phone: String,
    business_name: String,
    business_description: String,
    business_type: String,
    services: Array,
    products: Array,
    business_photo_gallery: Array,
    reviews: Array
  },
  { collection: "users", versionKey: false }
);

// businessType: String,
const userBusinessModel = mongoose.model('Business', businessSchema);

export default userBusinessModel;