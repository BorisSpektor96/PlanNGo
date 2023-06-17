import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // cart: { type: Array, required: true, default: [] },
  // admin: { type: Boolean, required: true, default: false }
},
  { collection: 'users' }
);

const userModel = mongoose.model('users', userSchema);
export default userModel;