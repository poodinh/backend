import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"; 
import cors from "cors";
import fileUpload from "express-fileupload";
import movieRouter from "./routers/movieRouter.js";
import userRouter from "./routers/userRouter.js";
import setUp from "./docs/swagger.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// App creation
const app = express();

app.use(fileUpload());

app.use(express.static('static'));

app.use(
  cors({
    origin: "*",
  })
);


app.use(express.json());

app.use("/api", movieRouter);
app.use("/auth", userRouter);

const startApp = async () => {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(String(process.env.MONGO_URI))
    console.log("Successfully connectec to DB")

    app.listen(PORT, () => {
      if (process.env.NODE_ENV === "prod") {
        console.log(`Server is running in production mode on port ${PORT}`);
      } else {
        console.log(`Server is running in development mode on port ${PORT}`);
      }
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("Error connecting to database", err.message);
    }
  }
};

setUp(app)
startApp();
