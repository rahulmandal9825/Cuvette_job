import express from "express";
import { getuserbytoken, loginUser, logoutUser, signup, verifyEmail, verifyPhone } from "../controllers/user.controller.js";
import { loginValidation, signupValidation } from "../middlewares/AuthValidation.js";
import { verifyToken } from "../middlewares/verifytoken.js";

const router = express.Router();


router.post("/signup", signupValidation, signup);
router.post("/verifyemail", verifyEmail);
router.post("/verifyphone", verifyPhone);
router.post("/login", loginValidation, loginUser)
router.get("/verifyjwt", verifyToken, getuserbytoken)
router.get("/logout",verifyToken, logoutUser)



export default router;