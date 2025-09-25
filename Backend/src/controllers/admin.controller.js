import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";
import { Event } from "../models/Event.model.js";
import ApiError from "../utils/ApiError.js";
import { CLoudinaryFileUpload } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Registration } from "../models/Registration.model.js";
import { exportExcel } from "../utils/excelExport.js";
import bcrypt from "bcryptjs";
// import { exportDataToGoogleSheet } from "../utils/GoogleSheetExport.js";

const CCSM = async (coordinatorEmail) => {
    const plainPassword = "123456789";
    const hashed = await bcrypt.hash(plainPassword, 10);
    let user = await User.findOne({ email: coordinatorEmail });
    if (!user) {
        user = await User.create({
            email: coordinatorEmail,
            role: "coordinator",
            password: hashed,
        });
    } else {
        user.password = hashed;
        user.role = "coordinator";
        await user.save();
    }

    console.log("Created coordinator user");
    return user;
};

const createEvent = asyncHandler(async (req, res) => {
    console.log("Inside create event function");

    // 1. Take input from user
    const {
        name,
        description,
        date,
        time,
        venue,
        fee,
        seats,
        coordinatorEmail, // Changed from coordinatorId to coordinatorEmail to match your frontend
        bankName,
        IFSCcode, // Note: Your frontend uses IFSCcode but backend expects IFCScode
        bankAccNum,
    } = req.body;

    console.log("Received data:", req.body); // Add logging to see what's coming in

    // Validate required fields
    if (!name || name.trim() === "")
        throw new ApiError(400, "Name is Required");
    if (!description || description.trim() === "")
        throw new ApiError(400, "Description is Required");
    if (!date || date.trim() === "")
        throw new ApiError(400, "Date is Required");
    if (!time || time.trim() === "")
        throw new ApiError(400, "Time is Required");
    if (!venue || venue.trim() === "")
        throw new ApiError(400, "Venue is Required");
    if (!seats || seats === "") throw new ApiError(400, "Seats are required");
    if (!coordinatorEmail || coordinatorEmail.trim() === "")
        throw new ApiError(400, "Coordinator email is required");

    // Validate bank details if fee > 0
    if (fee > 0) {
        if (!bankName || bankName.trim() === "")
            throw new ApiError(400, "Bank Name is required when fee > 0");
        if (!IFSCcode || IFSCcode.trim() === "")
            throw new ApiError(400, "IFSC code is required when fee > 0");
        if (!bankAccNum || bankAccNum === "")
            throw new ApiError(
                400,
                "Bank Account Number is required when fee > 0"
            );
    }

    // Improved createDate function with better error handling
    const createDate = (dateString) => {
        if (!dateString) {
            throw new ApiError(400, "Date is required");
        }

        try {
            // Handle different date formats
            let day, month, year;

            if (dateString.includes("/")) {
                // Format: DD/MM/YYYY or DD/MM/YY
                const parts = dateString.split("/").map(Number);
                if (parts.length !== 3) {
                    throw new Error("Invalid date format. Expected DD/MM/YYYY");
                }
                [day, month, year] = parts;
            } else if (dateString.includes("-")) {
                // Format: YYYY-MM-DD (HTML date input format)
                const parts = dateString.split("-").map(Number);
                if (parts.length !== 3) {
                    throw new Error("Invalid date format. Expected YYYY-MM-DD");
                }
                [year, month, day] = parts;
            } else {
                throw new Error("Unsupported date format");
            }

            // Handle 2-digit years
            const fullYear = year < 100 ? 2000 + year : year;

            // Validate date components
            if (month < 1 || month > 12) throw new Error("Invalid month");
            if (day < 1 || day > 31) throw new Error("Invalid day");
            if (year < 2000 || year > 2100) throw new Error("Invalid year");

            // Month is 0-indexed in JavaScript Date
            return new Date(Date.UTC(fullYear, month - 1, day));
        } catch (error) {
            throw new ApiError(
                400,
                `Invalid date format: ${error.message}. Received: ${dateString}`
            );
        }
    };

    const eventDate = createDate(date);

    // Check for existing event
    const existEvent = await Event.findOne({
        $and: [{ eventDate }, { time }, { venue }],
    });

    if (existEvent) {
        throw new ApiError(
            405,
            "An Event is already scheduled on same date, time and venue"
        );
    }

    const coordinator = await CCSM(coordinatorEmail);

    const event = await Event.create({
        name: name.trim(),
        description: description.trim(),
        date: date.trim(),
        time: time.trim(),
        venue: venue.trim(),
        fee: Number(fee) || 0,
        seats: Number(seats),
        coordinatorId: coordinator._id,
        bankName: bankName ? bankName.trim() : "",
        IFSCcode: IFSCcode ? IFSCcode.trim() : "", // Fixed variable name consistency
        bankAccNum: bankAccNum ? bankAccNum.toString().trim() : "",
    });

    const eventCreated = await Event.findById(event._id);
    if (!eventCreated) {
        throw new ApiError(500, "Something went wrong while registering event");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                201,
                { eventCreated, coordinator },
                "Event Registered Successfully"
            )
        );
});

const listEvent = asyncHandler(async (req, res) => {
    console.log(`inside list Event function`);
    const events = await Event.find();
    // .populate("coordinateId", "email");
    return res
        .status(200)
        .json(new ApiResponse(200, events, "List of all Events"));
});

const exportEventsExcel = asyncHandler(async (req, res) => {
    // const eventID = req.params.id;
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    const regs = await Registration.find({ eventId: id }).sort({
        createdAt: 1,
    });
    console.log(regs);
    if (!regs.length) {
        return res.status(404).json({ message: "No registrations found" });
    }
    // const buffer = await exportExcel(regs);
    const sheetLink = await exportDataToGoogleSheet(regs);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { sheetLink },
                "Data retrived successfully in spreadsheet"
            )
        );
    // .set({
    // "Content-Type":
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // "Content-Disposition": `attachment; filename=registrations_${eventID}.xlsx`,
    // })
    // .send(buffer);
});

export { createEvent, listEvent, exportEventsExcel };
