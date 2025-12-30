import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./Config/mongoDB.js"
import vendorRouter from "./Routes/VendorRoutes.js"
import productRouter from "./Routes/ProductRoutes.js"
import connectCloudinary from "./Config/cloudinary.js"
import adminRouter from "./Routes/AdminRoutes.js"

const PORT=process.env.PORT 
const app=express()

await connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/vendor',vendorRouter)
app.use('/api/product',productRouter)
app.use('/api/admin',adminRouter)

app.get('/',(req,res)=>{
    res.send("Backend Working")
})

app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
})