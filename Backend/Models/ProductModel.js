import mongoose from "mongoose";
import { type } from "os";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    vendorId:{
        type:String,
        ref:"vendor"
    },
    status: { 
        type: String, 
        enum: ["pending", "approved", "rejected"], 
        default: "pending" 
    }
    
},{timestamps:true})


const productModel=mongoose.models.product || mongoose.model('product',productSchema)

export default productModel