import React, { useState } from 'react'
import { LoginModelType, submitHandle } from '../requests/login'
import { useNavigate } from 'react-router-dom';

  type resultType= {
  token: string,
  isAuthanticated:boolean
}

export default function LoginForm() {
  let navigate = useNavigate();
  const [user, setUser] = useState({} as LoginModelType);
  return (
    
        <form onSubmit={(e)=> {
         let result = submitHandle(e,{userName: user.userName, password: user.password});
         result.then((res: resultType)=>{
          console.log(res);
          if(res.isAuthanticated) {
            alert('başarılı');
            localStorage.setItem('token', res.token);
            navigate('/');
          }
          else{
            alert('Giriş Başarısız');
          }
        })     
         result.catch((err)=>{
          console.log(err.message);
         })

        }}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
    onChange={(e)=>setUser({...user, userName: e.target.value})} />
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"
    onChange={(e)=> setUser({...user, password:e.target.value})}/>
  </div> 
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    
  )
} 

