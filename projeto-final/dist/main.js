import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
console.log(PORT);
const app = express();
app.use(express.json());
const startApp = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("Error connecting to database", err.message);
        }
    }
};
startApp();
//# sourceMappingURL=main.js.map