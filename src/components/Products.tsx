import React, { useEffect, useState } from 'react'
import Card from './Card';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../requests/login';
import { getProducts, productType } from '../requests/product';
import { BsPencilSquare, BsBasket, BsEraser } from "react-icons/bs";

let Product ={
  id:'',
  name:'',
  price:'',
  description:'',  
  image:''
}

export default function Products() {
  const [products, setProducts] = useState([{
         "id": 1,
        "name": "Learn React In a Better Way",
        "price": 49.95,
        "description": "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",        
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo7uR98zVo_ApGapPLCnOalSCr7o9fcKFEpA&amp;usqp=CAU"
    },
      {
      "id": 2,
        "name": "The Complete Communication Skills Master Class For Life",
        "price": 49.95,
        "description": "Communication Skills for Persuasion, Assertiveness and All Business Communication Needs",        
        "image":"https://trainingexpress.org.uk/wp-content/uploads/2020/03/Communication-Skills.jpg" 
       },
    
       {
        "id": 3,
          "name": "Introduction to Finance, Accounting, Modeling and Valuation",
          "price": 59.95,
          "description": "Learn Finance & Accounting from Scratch by an Award Winning MBA Professor, Ivy Grad, worked @ Goldman & VC",          
          "image": "https://img-c.udemycdn.com/course/750x422/888716_4225_8.jpg" 
        
         },

   ] as productType[]);   

   
  let navigate = useNavigate();
  useEffect(()=>{    
     let token: string|null = localStorage.getItem('token');
     console.log(token);
     if(token==null) {
      navigate('/login');
     }
     else{
      checkToken(token).then((data:boolean)=>{
        if(data) {
          getProducts(token).then((data:productType[])=> console.log(data))
        }
        else{
          navigate('/login');
        }
      })
     }
  },[[]]);   
  const [word, setWord] = useState("");
      
  return (
    
    <div className='row'>              
      <div className='form-group mt-2'>
        <input type='text' className='form-control' 
        placeholder='Search' onChange={(e) => setWord(e.target.value)}  />
        <h1>Products</h1>
        <table className='table'>
          <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>işlemler</th>                                

              </tr>

          </thead>
            <tbody>
              {
                products.map((product)=>{
                  return(
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>                       
                      <td><img src={product.image} alt={product.name} /></td>
                      <td>
                        <button className='btn btn-primary' title='Ürün Detay' onClick={()=> navigate('/ProductDetail/' +product.id)}><BsPencilSquare/></button>
                        <button className='btn btn-danger' title='Sil'><BsEraser/></button>
                        <button className='btn btn-info' title='Sepete Ekle'><BsBasket/></button>
                      </td>
                    </tr>
                  )
                })
              }


            </tbody>



        </table>



      </div>
      {
             
        products.filter((product) => {
        return product.name.toLowerCase().includes(word)
      }).map((product, i)=> {
        return <Card key={i}  />
      })
      }
       </div>
  )
  
}
