import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { changeDetailProduct, getProduct, productType } from '../requests/product';


export default function ProductDetail() {    
    const params = useParams();
    let token = localStorage.getItem('token');
    const [product, setProduct] = React.useState({} as productType);
   useEffect(()=> {
    getProduct(token, Number(params.id)).then((data)=>{
      console.log(data);
      setProduct(data);
    }
    );
    
   }, []
   );
   const handleChange =(e:React.ChangeEvent<HTMLInputElement>) => { 
    setProduct({...product, [e.target.id]: e.target.value} as productType);
    
   }
   const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      changeDetailProduct(token, product).then((result)=> {
        navigate('/');
      }).catch(err => {
        console.log(err);
      })
   }
   let navigate = useNavigate();
       
  return (
    <div>
        <button type="button"
          onClick={()=> navigate('/')} className='btn btn-primary'>AllProducts
        </button>
        <form className='mt-5' onSubmit={(e)=>onSubmit(e)}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" defaultValue={product.name} 
    onChange={(e)=>handleChange(e)}/>    
  </div> 
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" defaultValue={product.description} 
    onChange={(e)=>handleChange(e)}  />    
  </div>  
  <div className="mb-3">
    <label htmlFor="price" className="form-label">Price</label>
    <input type="number" className="form-control" id="price" defaultValue={product.price}
    onChange={(e)=> handleChange(e)} />    
  </div> 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
