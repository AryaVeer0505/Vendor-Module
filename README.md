Vendor Module – MERN Stack

A simple Vendor Authentication & Product Management system built using the MERN Stack.
Vendors can register, login, manage products, and view product approval status.

Tech Stack---

React.js
Tailwind CSS
Node.js
Express.js
MongoDB
JWT Authentication
Google OAuth
Cloudinary (Image Upload)

Features---

Vendor Signup & Login (Email / Password)
Google OAuth Login
JWT-based authentication
Vendor Profile page
Add products with image upload
View all products
View pending products
Product approval status (Pending / Approved / Rejected)

API Endpoints---

Vendor

POST /api/vendor/sign-up – Vendor registration
POST /api/vendor/login – Vendor login
POST /api/vendor/google-login – Google OAuth login
GET /api/vendor/profile – Get vendor profile

Products

POST /api/product/add – Add new product
GET /api/product/vendor – Get vendor products
GET /api/product/pending – Get pending products
PUT /api/product/approve/:productId – Approve / reject product

Run Project Locally---

Backend--

npm install
npm start


Frontend--

npm install
npm run dev


