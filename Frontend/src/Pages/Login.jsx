/* eslint-disable react-hooks/exhaustive-deps */

import axios from 'axios'
import { useContext } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../Context/AppContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {token,setToken,backendURL}=useContext(AppContext)
    const navigate=useNavigate()
    const [state,setState]=useState("Sign Up")
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phone,setPhone]=useState('')

const onSubmitHandler=async(e)=>{
    e.preventDefault()
    try {
       if(state==="Sign Up"){
         const {data}=await axios.post(`${backendURL}/api/vendor/sign-up`,{name,email,password,phone})
        if(data.success){
            setToken(data.token)
            localStorage.setItem('token',data.token)
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
       }else{
         const {data}=await axios.post(`${backendURL}/api/vendor/login`,{email,password})
        if(data.success){
            setToken(data.token)
            localStorage.setItem('token',data.token)
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
       }
    } catch (error) {
      console.log(error)  
      toast.error(error.message)
    }
}

useEffect(()=>{
    if(token){
       navigate('/')
    }
},[token])
  return (
  
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
          <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-85  sm:w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-center mb-5 text-2xl font-bold'>Vendor {state==="Sign Up"?"Register":"Login"}</p>
        {
            state==="Sign Up"
            &&
            <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} className='border outline-0 rounded py-2 px-5 w-full'/>
        }
        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='border outline-0 rounded py-2 px-5 w-full'/>
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='border outline-0 rounded py-2 px-5 w-full'/>
        {
            state==="Sign Up"
            &&
            <input type='number' placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)} className='border outline-0 rounded py-2 px-5 w-full'/>
        }
        <button className='bg-black text-white py-2 px-5 rounded font-semibold w-full hover:bg-gray-800 transition-all cursor-pointer'>{state==="Sign Up"?"Register":"Login"}</button>
        {
            state==="Sign Up"
            ?
            <p className='cursor-pointer'>Already Registered <span className='text-red-500' onClick={()=>setState("Login")}>Login Here</span></p>
            :
            <p className='cursor-pointer'>New Here <span className='text-red-500' onClick={()=>setState("Sign Up")}>Register Here</span></p>
        }
          </div>
      </form>
  
  )
}

export default Login
