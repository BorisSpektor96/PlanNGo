import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phoneNumber: String,
  isBusiness: Boolean,
  favorites: Array,
  userType: String,
  profileImg: { type: String, required: false }
}, { collection: 'users', versionKey: false },
);

const userModel = mongoose.model('users', userSchema);
export default userModel;