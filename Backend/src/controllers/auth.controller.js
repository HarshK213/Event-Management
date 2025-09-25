import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const validMail = (email) => {
    return /^[a-z]+\.([0-9]{2}[a-z]{3}[0-9]{5})@vitbhopal\.ac\.in$/.test(email);
}

const GenerateAccessToken = async(userid) => {
    try {
        const user = await User.findById(userid);
        const accessToken = user.generateAccessToken();
        await user.save({validateBeforeSave : false})
        return accessToken;
    }catch (error) {
        throw new ApiError(500,"Something went wrong while generating access and refresh tokens");
    }
};

const adminLogin = asyncHandler(async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email, role: "admin" });

  if (!user) {
    throw new ApiError(401, "User not exist");
  }

  const isPasscorrect = await user.isPassCorrect(pass);

  if (!isPasscorrect) {
    throw new ApiError(401, "Password is incorrect");
  }

  const accessToken = await GenerateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
      httpOnly : true,
      secure : true,
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, {user : loggedInUser, accessToken}, "User Logged in Successfully")
    );
});

const coordinatorLogin = asyncHandler(async (req, res) => {

  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email, role: "coordinator" });

  if (!user) {
    throw new ApiError(401, "User not exist");
  }

  const isPasscorrect = await user.isPassCorrect(pass);

  if (!isPasscorrect) {
    throw new ApiError(401, "Password is incorrect");
  }

  const accessToken = await GenerateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
      httpOnly : true,
      secure : true,
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, {user : loggedInUser, accessToken}, "User Logged in Successfully")
    );
});

const registerStudnet = asyncHandler(async(req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if(!validMail(email))throw new ApiError(400, "use VIT mail id Only");

  const user = await User.findOne({ email});

  if (user) {
    throw new ApiError(401, "User already exist");
  }

  const pw = await bcrypt.hash(pass, 10);

  const createdStudent = User.create({email, role:'student', password : pw});

  return res
  .status(200)
  .json(
    new ApiResponse(200, createdStudent, "Studnet id successfully created")
  )
})

const studentLogin = asyncHandler(async (req, res) => {

  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email, role: "student" });

  if (!user) {
    throw new ApiError(401, "User not exist");
  }

  const isPasscorrect = await user.isPassCorrect(pass);

  if (!isPasscorrect) {
    throw new ApiError(401, "Password is incorrect");
  }

  const accessToken = await GenerateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
      httpOnly : true,
      secure : true,
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, {user : loggedInUser, accessToken}, "User Logged in Successfully")
    );
});

const logout = asyncHandler(async(req, res) => {
  const options = {
          httpOnly : true,
          secure : true,
     }

     return res
     .status(200)
     .clearCookie("accessToken", options)
     .json(
          new ApiResponse(
               200,
               {},
               "User Logged out successfully"
          )
     )
})

const getCurrUser = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if(!user){
    throw new ApiError(404, "User not logged In");
  }

  return res
  .status(200)
  .json(new ApiResponse(
    200, 
    {
      user,
    },
    "Current User get Successfully"
  ))
})

export { adminLogin, coordinatorLogin, studentLogin, registerStudnet, logout, getCurrUser};
