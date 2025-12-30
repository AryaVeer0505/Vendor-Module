import express from "express"
import vendorAuth from "../Middlewares/VendorAuth.js"
import { addProduct, approveProduct, pendingProducts, vendorProduct } from "../Controllers/ProductController.js"
import upload from "../Middlewares/multer.js"

const productRouter=express.Router()

productRouter.post("/add",vendorAuth,upload.single('image'),addProduct)
productRouter.get("/vendor",vendorAuth,vendorProduct)
productRouter.get("/pending",vendorAuth,pendingProducts)
productRouter.put("/approve/:productId",approveProduct)

export default productRouter