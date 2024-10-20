import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import authRouters from "./routes/auth.route.js";
import interviewformroutes from "./routes/interviewform.route.js";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __dirname = path.resolve();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // Allows us to parse incoming requests: req.body
app.use(cookieParser()); // Allows us to parse incoming cookies

app.use("/api/auth", authRouters);
app.use("/api/form", interviewformroutes);


	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});

app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});
