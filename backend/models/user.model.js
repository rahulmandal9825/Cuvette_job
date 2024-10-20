import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
        PhoneNum: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
        ComapanyName: {
			type: String,
			required: true,
		},
        email: {
			type: String,
			required: true,
		},
        employeeSize: {
			type: Number,
			required: true,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		isPhoneVerified: {
			type: Boolean,
			default: false,
		},
		refreshToken:{
			type: String
		},
		verificationOTPEmail: String,
        verificationOTPphone: String,
		verificationOTPExpiresAt: Date,
	},
	{ timestamps: true }
);

userSchema.methods.isPassWordCorrect = async function (password) {
    return await bcryptjs.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken  = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema);