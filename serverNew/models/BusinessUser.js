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
    profileImg: String,
    reviews: Array,
    appointmentsDef: [
      {
        fixedBreak: Array,
        fixedDaysOff: Array,
        OneTimeDayOff: Array,
        appointments: Array,
        businessHours: Object
      }
    ],
    messages: [
      {
        read: Boolean,
        UserEmail: String,
        date: String,
        content: String,
        status: String,
        subject: String,
      }
    ],
  },
  { collection: "users", versionKey: false }
);

const userBusinessModel = mongoose.model('Business', businessSchema);

export default userBusinessModel;