import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  phoneNumber: String,
  isBusiness: Boolean,
  favorites: Array,
  appointments: Array,
  securityQuestion: Object,
  messages: [
    {
      read: Boolean,
      businessEmail: String,
      date: String,
      content: String,
      status: String,
      subject: String,

    }
  ],
  profileImg: { type: String, required: false }
}, { collection: 'users', versionKey: false },
);

const userModel = mongoose.model('users', userSchema);
export default userModel;