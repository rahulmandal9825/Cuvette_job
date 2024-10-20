import express from "express";
import {  Sendinterviewfrom } from "../middlewares/AuthValidation.js";
import { verifyToken } from "../middlewares/verifytoken.js";
import { sendInterviewForm } from "../controllers/user.controller.js";

const router = express.Router();


router.post("/sendinterviewform", Sendinterviewfrom, verifyToken, sendInterviewForm);



export default router;