import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
    eventId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Event',
        required : true,
    },
    studentEmail : {
        type : String,
        required : true,
    },
    regNum : {
        type : String,
    },
    Name : {
        type : String,
    },
    transactionID : {
        type : String,
    },
},{
    timestamps : true
})

RegistrationSchema.index({eventId : 1, studentEmail : 1}, {unique : true});

export const Registration = new mongoose.model("Registration", RegistrationSchema);