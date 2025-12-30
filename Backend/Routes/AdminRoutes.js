import express from "express"
import { adminLogin, allProducts, allVendors } from "../Controllers/AdminController.js"

const adminRouter=express.Router()

adminRouter.post("/login",adminLogin)
adminRouter.get("/all-products",allProducts)
adminRouter.get("/all-vendors",allVendors)

export default adminRouter