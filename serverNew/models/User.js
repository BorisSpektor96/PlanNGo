import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phoneNumber: String,
  isBusiness: Boolean,
  favorites: Array,
  img: {
    data: Buffer,
    contentType: String
  }
}, { collection: 'users', versionKey: false },
);

const userModel = mongoose.model('users', userSchema);
export default userModel;