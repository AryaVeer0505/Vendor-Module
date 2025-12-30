import mongoose from "mongoose";

const vendorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    oauthProvider: { 
        type: String, 
        enum: ["local", "google"], 
        default: "local" 
    },
},{timestamps:true})


const vendorModel=mongoose.models.vendor || mongoose.model('vendor',vendorSchema)

export default vendorModel