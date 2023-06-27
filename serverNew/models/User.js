import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isBusiness: { type: Boolean, required: true, default: false }
}, { collection: 'users', versionKey: false },
);

const userModel = mongoose.model('users', userSchema);
export default userModel;