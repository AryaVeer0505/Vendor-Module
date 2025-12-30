import express from "express"
import { login, register } from "../Controllers/VendorControllers.js"

const vendorRouter=express.Router()

vendorRouter.post("/sign-up",register)
vendorRouter.post("/login",login)


export default vendorRouter