/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
    const [products,setProducts]=useState([])

    const backendURL=import.meta.env.VITE_BACKEND_URL
   

    const getVendorProducts=async()=>{
        try {
            const {data}=await axios.get(`${backendURL}/api/product/vendor`,{headers:{token}})
            if(data.success){
                setProducts(data.vendorData)
            }
        } catch (error) {
           console.log(error)
           toast.error(error.message) 
        }
    }

    const getPendingProducts=async()=>{
        try {
             const {data}=await axios.get(`${backendURL}/api/product/pending`,{headers:{token}})
            if(data.success){
                setProducts(data.pendingProducts)
            }
        } catch (error) {
             console.log(error)
           toast.error(error.message) 
        }
    }

     const vales={
       token,setToken,backendURL,products,setProducts,getVendorProducts,getPendingProducts
    }
    return (
        <AppContext.Provider value={vales}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider