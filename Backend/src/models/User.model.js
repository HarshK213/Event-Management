import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    role : {
        type : String,
        enum : ['admin', 'coordinator', 'student'],
        required : true,
    },
    password : {
        type : String,
    },
    
},{
    timestamps : true,
})

// UserSchema.pre("save", async function(next){
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password,10);
//     }
//     next();
// })

UserSchema.methods.isPassCorrect = async function (pass){
    return await bcrypt.compare(pass, this.password);
}

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
        id: this._id,
        role: this.role,
        email: this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        }
    );
}

export const User = new mongoose.model("User", UserSchema);