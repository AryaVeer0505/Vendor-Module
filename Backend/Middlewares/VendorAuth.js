import jwt from "jsonwebtoken"

const vendorAuth=(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return res.json({
                success:false,
                message:"Not Authorised"
            })
        }
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
       req.vendorId = decodedToken.id
       next()
    } catch (error) {
          return res.json({
                success:false,
                message:error.message
            })
    }
}

export default vendorAuth