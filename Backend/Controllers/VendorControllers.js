import vendorModel from "../Models/VendorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { name, email, password,phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing Details",
      });
    }

    const vendorExist = await vendorModel.findOne({ email });
    if (vendorExist) {
      return res.status(409).json({
        success: false,
        message: "User Already Exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendorData = {
      name,
      email,
      phone,
      password: hashedPassword,
      oauthProvider:"local"
    };
    const newVendor = new vendorModel(vendorData);
    const vendor = await newVendor.save();

    const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET,{expiresIn:"1d"});

    res.status(201).json({
      success: true,
      token,
      message: "Vendor Registered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Details",
      });
    }

    const vendor = await vendorModel.findOne({ email });
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Please login first",
      });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);

    if (isMatch) {
      const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET,{expiresIn:"1d"});
      return res.status(200).json({
        success: true,
        token,
        message: "Vendor logged in",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {register,login}