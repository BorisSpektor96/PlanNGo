import mongoose from 'mongoose'

const Uri = `mongodb+srv://boris:boris@nodejs.yw9l3yb.mongodb.net/app`

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(Uri,
      {
        useNewUrlParser: true,
      });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
}

export default connectDB;