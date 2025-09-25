import mongoose, { mongo, Mongoose } from "mongoose";

const EventSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        required : true,
        type : String,
    },
    date : {
        type : String,
        required : true,
    },
    time : {
        type : String,
        required : true,
    },
    venue : {
        type : String,
        required : true,
    },
    fee : {
        type : Number,
        default : 0,
    },
    seats : {
        type : Number,
        default : 0,
    },
    registered : {
        type : Number,
        default : 0,
    },
    coordinatorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    bankName : {
        type : String,
    },
    IFSCcode : {
        type : String,
    },
    bankAccNum : {
        type : Number,
    },
    // banner : {
    //     type : String,
    // },
    status : {
        type : String,
        enum : ['open', 'paused', 'closed'],
        default : 'open',
    },
},{
    timestamps : true,
})

export const Event = new mongoose.model("Event", EventSchema);