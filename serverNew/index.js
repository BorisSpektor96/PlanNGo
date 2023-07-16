import express from "express";
import cors from 'cors';
import connectDB from './configuration/mongoose.js';
import userRouter from "./routes/user.route.js";
import userBusinessRouter from "./routes/userBusiness.route.js";

//  *************** added for img upload **************** 
// import bodyParser from "body-parser";
// import imgSchema from './models/ImgModel.js';
// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import multer from "multer";

// dotenv.config();
//  ****************end section****************** 

const app = express();
const port = 3001;

app.use(express.json());

//  *************** added for img upload **************** 
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}`);
//   },
// });

// const upload = multer({ storage: storage })

// app.post('/', upload.single('image'), (req, res, next) => {
//   const obj = {
//     name: req.body.name,
//     desc: req.body.desc,
//     img: {
//       data: fs.readFileSync(path.join(__dirname, '/uploads/', req.file.filename)),
//       contentType: 'image/png',
//     },
//   };
//   imgSchema.create(obj)
//     .then(item => {
//       item.save();
//       res.redirect('/');
//     })
//     .catch(err => console.error(err));
// });

// const port = 3001;
//  ****************end section******************

connectDB()

app.use(cors());
app.use("/users", userRouter);
app.use("/business", userBusinessRouter);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server app listening on port ${port}!`)
});
