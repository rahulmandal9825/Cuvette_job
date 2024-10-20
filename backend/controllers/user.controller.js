import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { sendInterviewEmail, sendVerificationEmail } from "../utils/sendmail.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { SendPhoneOtp } from "../utils/sendphoneotp.js";
import { Job } from "../models/JobForm.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error)
    throw new ApiError(500, " someting went wrong while genrating tokens");
  }
};

const sendCookiesAndResponse = (res, user, accessToken, refreshToken, message) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user, accessToken, refreshToken }, message));
};

const isUserVerified = (user) => {
  return user.isEmailVerified && user.isPhoneVerified;
};


function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a random number between 100000 and 999999
    return otp.toString(); // Converts the number to string for flexibility
}


const signup = async (req,res) =>{
    const {name, PhoneNum, password, ComapanyName ,email, employeeSize } = req.body;

    if (
        [name, PhoneNum, password, ComapanyName ,email].some((field) => field?.trim() === "")
      ) {
        throw new ApiError(400, "all fields is required");
      }


      const userAlreadyExists = await User.findOne({email})
      console.log("userAlreadyExists");

      if (userAlreadyExists) {
        return res
        .status(201)
        .json(new ApiResponse(400, {}, " user already exist"));
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const verificationOTPEmail = generateOTP()
      const verificationOTPphone =generateOTP()

      const user = new User({
        name,
        PhoneNum,
        password: hashedPassword,
        ComapanyName,
        email,
        employeeSize,
        verificationOTPEmail,
        verificationOTPphone,
        verificationOTPExpiresAt: Date.now() + 15*60*1000 // 14 min
      })

      await user.save();


      // send opt email and otp phone

      await sendVerificationEmail(email, verificationOTPEmail, name)
      
      // // // send otp in phone 
      await SendPhoneOtp(verificationOTPphone, PhoneNum )

      const createdUser = await User.findById(user._id).select(
        "-password  -verificationOTPEmail -verificationOTPExpiresAt -verificationOTPphone"
      );

      if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
      }

      return res
      .status(201)
      .json(new ApiResponse(200,createdUser, " OTP Send Successfully"));


}


const verifyUser = async (req, res, otpType) => {
  const { otp, userId } = req.body;
  const otpField = otpType === 'email' ? 'verificationOTPEmail' : 'verificationOTPphone';


  const user = await User.findOne({
    _id: userId,
    [otpField]: otp,
    verificationOTPExpiresAt: { $gt: Date.now() },
  });
  

  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid or expired verification OTP" });
  }

  user[otpField] = undefined;
  user[`is${otpType.charAt(0).toUpperCase() + otpType.slice(1)}Verified`] = true;

  await user.save();

  if (isUserVerified(user)) {
    user.verificationOTPExpiresAt = undefined;

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    console.log(accessToken , refreshToken)

    const loggedinuser = await User.findById(user._id).select("-password")



    return sendCookiesAndResponse(res, loggedinuser, accessToken, refreshToken, "User logged in successfully");
  }

  return res.status(201).json(new ApiResponse(200, {}, `${otpType.charAt(0).toUpperCase() + otpType.slice(1)} verified successfully`));
};



const verifyEmail = (req, res) => verifyUser(req, res, 'email');
const verifyPhone = (req, res) => verifyUser(req, res, 'phone');




const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (! email) {
    throw new ApiError(400, "email is required");
  }

  const user = await User.findOne({email});

  if (!user) {
    throw new ApiError(404, "user does not exist");
  }

  const isPasswordValid = user.isPassWordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, " invalid credentails");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInuser = await User.findById(user._id).select(
    "-password -isEmailVerified -isPhoneVerified"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200,
      {
        user: loggedInuser,
      },
      "USer logged in Succeessfully"
    )
  );
};

const getuserbytoken = async(req, res)=>{
  const {userId} = req;

  if (!userId) {
     throw new ApiError(404, "unauthorize user");
  }

  const loggedInuser = await User.findById(userId).select(
    "-password -isEmailVerified -isPhoneVerified"
  );

  if (!loggedInuser) {
    throw new ApiError(403, "user not found")
  }

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      {
        loggedInuser
      },
      "user is already login"
    )
  );
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.userId,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "user logged out "));
};
const sendInterviewForm = async (req, res) => {
  try {
    const { JobTitle, JobDescription, Experiencelevel, candidate, lastdate } = req.body;
    const { userId } = req;

    // Validate required fields
    if (!JobTitle || !JobDescription || !Experiencelevel || !candidate || !lastdate) {
      throw new ApiError(400, "All fields are required");
    }

    // Check if an interview form has already been sent by the user
    const interviewFormAlreadyExists = await Job.findOne({ owner: userId });

    if (interviewFormAlreadyExists) {
      return res
        .status(400) // Use 400 since it's a bad request scenario
        .json(new ApiResponse(400, {}, "Interview form has already been sent"));
    }

    // Create a new job form
    const jobForm = await Job.create({
      JobTitle,
      JobDescription,
      Experiencelevel,
      candidate,
      lastdate,
      owner: userId,
    });

    // Send interview email to candidates
    await sendInterviewEmail(jobForm);

    // Respond with success
    return res
      .status(201) // 201 Created status code
      .json(new ApiResponse(200, {}, "Interview form sent successfully"));
    
  } catch (error) {
    console.error("Error sending interview form:", error);

    // Handle unexpected errors and provide useful feedback
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(new ApiResponse(error.statusCode, {}, error.message));
    }

    // Generic server error
    return res
      .status(500) // 500 Internal Server Error for unknown issues
      .json(new ApiResponse(500, {}, "An error occurred while sending the interview form"));
  }
};


export {signup,
  verifyEmail,
  verifyPhone,
  loginUser,
  getuserbytoken,
  logoutUser,
  sendInterviewForm
}

