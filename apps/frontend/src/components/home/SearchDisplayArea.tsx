import ProductsPage from "@/app/products/page";
import React, { useState } from "react";
import ProductsList from "../products/ProductsList";

export default function SearchDisplayArea() {
  
    const [searchTerm, setSearchTerm] = useState('');
  
  
  
    return(
         <div className=" relative ">
               <ProductsList />
          
        </div>

    )
}