import asyncHandler from "../utils/asyncHandler.js";
import { Event } from "../models/Event.model.js";
import { Registration } from "../models/Registration.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const changeStatus = asyncHandler(async(req, res)=>{
    const { id } = req.params;
    const { status } = req.body;

    const event = await Event.findById(id);
    if (!event){
        throw new ApiError(
            404,
            "Event not found"
        );
    }
       
    event.status = status;
    await event.save();
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            event,
            "Status changed successfully",
        )
    );
})

const getRegistration = asyncHandler(async(req, res)=>{
    
    const { id } = req.params;
    
    const event = await Event.findById(id);
    if (!event){
        throw new ApiError(404, "Event not found");
    }

    const regs = await Registration.find({ eventId: id }).sort({ createdAt: -1 });
    
    return res
    .status(200)
    .json(new ApiResponse(200,regs, "Retrieved all registrations successfully"));
})

export {
    changeStatus,
    getRegistration
}