import asyncHandler from "../utils/asyncHandler.js";
import { Event } from "../models/Event.model.js";
import { Registration } from "../models/Registration.model.js";
import { CLoudinaryFileUpload } from "../utils/cloudinary.js";
import {v4 as uuidv4} from 'uuid'
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const validMail = (email) => {
    return /^[a-z]+\.([0-9]{2}[a-z]{3}[0-9]{5})@vitbhopal\.ac\.in$/.test(email);
}

const extractFromMail = (email) => {
    if (!email || typeof email !== 'string') {
        return { name: "", regno: "" };
    }
    
    const local = email.split('@')[0];
    const parts = local.split('.');
    return {
        name: parts[0] || "",
        regno: parts[1] || ""
    };
}

const listUpcoming = asyncHandler(async(req, res)=>{
    const now = new Date();
    const events = await Event.find();
    // {date : {$gte : now}}

    return res
    .status(200)
    .json(new ApiResponse(200, events, "All events retrieved successfully"));
})

const getMyEvents = asyncHandler(async(req, res) => {
    const user = req.user;
    if(!user)throw new ApiError(404, "Please log in first");

    const myEvents = await Registration.find({studentEmail : user.email});
    
    return res.status(200).json(
        new ApiResponse(200, myEvents, "Your events retrieved successfully")
    );

})

const viewEvent = asyncHandler(async(req, res)=> {
    
    const id = req.params.id;

    const event = await Event.findById(id);
    // .populate('coordinatorId', 'email')
    if (!event){
        throw new ApiError(404, "Event not found");
    }
    
    return res
    .status(200)
    .json(new ApiResponse(200,event,"All event retrieved successfully"));
})

const register = asyncHandler(async(req, res)=>{
    const eventId = req.params.id;
    const { email, transactionId } = req.body;

    if (!validMail(email))throw new ApiError(400, "Only vit mail id is allowed")
    const event = await Event.findById(eventId);
    if (!event)throw new ApiError(404, "Event not found");
    if (event.status !== 'open')throw new ApiError(400, "Registration are not open")
    if (event.registered >= event.seats)throw new ApiError(400, "No seats left")
    
    if(event.fee>0 && transactionId == "")throw new ApiError(400, "Transaction ID is required")

    const alreadyRegistered = await Registration.findOne({
        studentEmail : email,
        eventId : eventId
    })
    if(alreadyRegistered){throw new ApiError(400, "Already Registered for this event")}

    if(event.fee > 0){
        const sameTransactionID = await Registration.findOne({transactionID : transactionId})
        if(sameTransactionID)throw new ApiError(400, "Transaction ID already Used");
    }
    const { name : firstName, regno } = extractFromMail(email);

    const newReg = await Registration.create({
        eventId, 
        studentEmail: email,
        regNum : regno,
        Name : firstName,
        transactionID : transactionId
    });

    event.registered = (event.registered || 0) + 1;
    await event.save();

    return res
    .status(200)
    .json(new ApiResponse(200,newReg,"Registered Successfully"));
})

export {
    listUpcoming,
    viewEvent,
    register,
    getMyEvents
}