import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddProducts = () => {
  const { token, backendURL, getVendorProducts } = useContext(AppContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !category) {
      return toast.error("All fields are required");
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendURL}/api/product/add`,
        formData,
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Product added");
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setImage(null);
        getVendorProducts();
      }
    } catch (error) {
      toast.error(error.message || "Failed to add product");
    }
  };

   if (!token) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500">Please login first</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Product</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="resize-none w-full border rounded px-3 py-2 focus:outline-none focus:ring-2"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="cursor-pointer underline py-2 px-3 w-fit"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition disabled:opacity-60"
          >Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
