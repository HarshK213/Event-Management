import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyRoles = (...allowRoles) => {
    return asyncHandler(async(req , res , next)=> {
        console.log("Inside verify role function");
        if(!req.user){
            throw new ApiError(401, "Not Authenticated");
        }
        if(!allowRoles.includes(req.user.role)){
            throw new ApiError(401, "Forbidden");
        }
        next();
    })
}

