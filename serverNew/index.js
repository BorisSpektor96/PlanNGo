import express from "express";
import cors from 'cors';
import connectDB from './configuration/mongoose.js';
import userRouter from "./routes/user.route.js";
import userBusinessRouter from "./routes/userBusiness.route.js";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
connectDB()

app.use(bodyParser.json())
app.use(cors());
app.use('/public', express.static('public'));


app.use("/users", userRouter);
app.use("/business", userBusinessRouter);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server app listening on port ${port}!`)
});
