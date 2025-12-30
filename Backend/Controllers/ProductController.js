import productModel from "../Models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";

//api for adding product
const addProduct = async (req, res) => {
  try {
    const vendorId = req.vendorId;
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing Details",
      });
    }

    let imageURL = "";
    if (req.file) {
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      imageURL = uploadImage.secure_url;
    }

    const product = await productModel.create({
      name,
      description,
      price,
      category,
      image: imageURL,
      vendorId,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Product Added",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//APi for fetching vendors products

const vendorProduct=async(req,res)=>{
    try {
         const vendorId = req.vendorId;
         const vendorData=await productModel.find({vendorId})
        res.status(201).json({
      success: true,
      vendorData
    });

    } catch (error) {
         res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}

//Api for fetching pending Products

const pendingProducts = async (req, res) => {
  try {
    const vendorId = req.vendorId;

    const pendingProducts = await productModel.find({
      vendorId,
      status: "pending",
    });

    res.status(200).json({
      success: true,
      pendingProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//Api for changing Status

const approveProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { status } = req.body;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.status = status;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Status changed successfully`,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export { addProduct,vendorProduct ,pendingProducts,approveProduct};
