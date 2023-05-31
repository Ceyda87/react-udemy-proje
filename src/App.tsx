import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './App.css';
import Products from './components/Products';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import Users from './components/Users';
import LoginForm from './components/LoginForm';


function App() {
  
  return (  
    
    <div className='container'> 
       
      <Routes>
        <Route path= "/" element={<Products />} />        
        <Route path= "/productdetail/:productId" element= {<ProductDetail />} />
        <Route path= "/user" element={<Users />} /> 
        <Route path= "/login" element={<LoginForm />} />      
        
      </Routes>
      
     
    </div>
  );
}

export default App;
