import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import authRouters from "./routes/auth.route.js"
import interviewformroutes from "./routes/interviewform.route.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies


app.use("/api/auth", authRouters)

app.use("/api/form", interviewformroutes)

app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});