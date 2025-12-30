/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";

const LatestProducts = () => {
  const { token, products, getVendorProducts } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      getVendorProducts();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500">Please login to see dashboard data</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-gray-400 text-lg font-medium">
          No products added yet
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-semibold mb-6">Latest Products</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {products.slice(0, 10).map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-3 font-medium text-gray-900">
                  {item.name}
                </td>

                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                  {item.description}
                </td>

                <td className="px-4 py-3">
                  {item.category}
                </td>

                <td className="px-4 py-3">
                  ₹{item.price}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize
                      ${
                        item.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestProducts;
