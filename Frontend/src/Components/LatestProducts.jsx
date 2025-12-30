/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { useEffect } from 'react'

const LatestProducts = () => {
    const {token,products,getVendorProducts}=useContext(AppContext)

    useEffect(()=>{
        if(token){
           getVendorProducts()
        }
    },[token])


  return token ?(
    <div>
      <p>Lastest Products</p>
      <div>
        {
            products.slice(0,10).map((item,index)=>(
                <div key={index}>

                </div>
            ))
        }
      </div>
    </div>
  ):(
    <div>
        <p>Please Login To see Dashboard Data</p>
    </div>
  )
}

export default LatestProducts
