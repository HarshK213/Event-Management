import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
      // console.log(`toekn : ${token}`)

      if (!token) {
        throw new ApiError(401, "Unauthorized Access - No token provided");
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decodedToken.id);
      // console.log(decodedToken?.id);
      
      const user = await User.findById(decodedToken?.id).select("-password");

      // console.log(`User : ${user}`)

      if (!user) {
        throw new ApiError(401, "Invalid Access Token - User not found");
      }

      console.log(`${user.role} role is verified`);
    
      req.user = user;
      next();


    }catch (error) {
      throw new ApiError(401,error?.message || "Unauthorized Access - Invalid token");
    }
  }
);