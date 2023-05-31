import React, { useState } from 'react';
import Products from './Products';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { productType } from '../requests/product';


export default function Card() { 
    const [product, setProduct] = React.useState({} as productType);
    const cardStyle = {
        width:'18rem',
    }
    
    return (
      <div className='col'>
        <div  className="card mt-2 ms-2 col" style={cardStyle}>
      <img src= {product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <a href={"/productdetail" + product.id} className="btn btn-primary">Add To Cart</a>
          </div>
      </div>
    </div>
      
    )
}
