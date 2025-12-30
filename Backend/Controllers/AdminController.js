import productModel from "../Models/ProductModel.js"
import vendorModel from "../Models/VendorModel.js"

//api for admin login

const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign({email:process.env.ADMIN_EMAIL},process.env.JWT_SECRET)
            res.send({
                success:true,
                token
            })

        }else{
             return res.json({
            success:false,
            message:"Invalid Credentials"
        })
        }
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

//api for fetching all products

const allProducts=async(req,res)=>{
    try {
        const products=await productModel.find({})
         res.send({
                success:true,
                products
            })
    } catch (error) {
         res.json({
            success:false,
            message:error.message
        })
    }
}

//api for fetching all vendors

const allVendors=async(req,res)=>{
    try {
        const vendors=await vendorModel.find({})
         res.send({
                success:true,
                vendors
            })
    } catch (error) {
          res.json({
            success:false,
            message:error.message
        })
    }
}

export {adminLogin,allProducts,allVendors}