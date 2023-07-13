import mongoose from 'mongoose';

const imgSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String
  }
});

const ImgModel = mongoose.model('Image', imgSchema);

export default ImgModel;