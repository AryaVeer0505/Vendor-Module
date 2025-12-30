/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { useEffect } from 'react'

const AllProducts = () => {
    const {token,products,getVendorProducts}=useContext(AppContext)

    useEffect(()=>{
        if(token){
           getVendorProducts()
        }
    },[token])


  return token ?(
    <div>
      <p>All Products</p>
      <div>
        {
            products.map((item,index)=>(
                <div key={index}>

                </div>
            ))
        }
      </div>
    </div>
  ):(
    <div>
        <p>Please Login To see Data</p>
    </div>
  )
}

export default AllProducts
