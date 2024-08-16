import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"; //dps no de casa fazer com uma nova database no mongoose 
import cors from "cors";
import fileUpload from "express-fileupload";
import movieRouter from "./routers/movieRouter.js";
//tem que haver um read me com a documentação do projeto, com as rotas que têm e exemplo do objeto que se pode mandar para lá
//idealmente fazer com o swagger

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

//ensinar a usar com o formato json
app.use(express.json());

app.use("/api", movieRouter);

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

startApp();
