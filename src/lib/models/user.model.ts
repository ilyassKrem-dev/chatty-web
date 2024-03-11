import mongoose from "mongoose";
import bcrypt from "bcrypt"


const UserShema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String
    },
    status:{
        type:String
    },
    bio:{
        type:String
    },
    lastLogin:{
        type:Date
    },
    completed:{
        type:Boolean,
        default:false
    }
    
},{timestamps:{
    createdAt:true
}})

UserShema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error:any) {
        return next(error);
    }
});

const User = mongoose.models.User || mongoose.model("User",UserShema)

export default User