import mongoose from "mongoose";
import "dotenv/config"

const connectDB=async(req,res)=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/InfyleTech`)
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

export default connectDB