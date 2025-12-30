import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { ToastContainer } from 'react-toastify'
import AllProducts from './Pages/AllProducts'
import AddProducts from './Pages/AddProducts'
import PendingProducts from './Pages/PendingProducts'
import ApprovedProducts from './Pages/ApprovedProducts'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/all-products' element={<AllProducts/>}/>
        <Route path='/pending-products' element={<PendingProducts/>}/>
        <Route path='/approved-products' element={<ApprovedProducts/>}/>
        <Route path='/add-products' element={<AddProducts/>}/>
      </Routes>
    </div>
  )
}

export default App
