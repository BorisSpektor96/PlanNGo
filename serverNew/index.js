import express from "express";
import cors from 'cors';
import connectDB from './configuration/mongoose.js'
import userRouter from "./routes/user.route.js"
import userBusinessRouter from "./routes/userBusiness.route.js"

const app = express();
const port = 3001;

app.use(express.json());

connectDB()

app.use(cors());
app.use("/users", userRouter);
app.use("/business", userBusinessRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
