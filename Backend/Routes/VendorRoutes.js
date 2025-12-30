import express from "express"
import { googleLogin, login, register, vendorProfile } from "../Controllers/VendorControllers.js"
import vendorAuth from "../Middlewares/VendorAuth.js"

const vendorRouter=express.Router()

vendorRouter.post("/sign-up",register)
vendorRouter.post("/login",login)
vendorRouter.get("/profile",vendorAuth,vendorProfile)
vendorRouter.post("/google-login", googleLogin);


export default vendorRouter