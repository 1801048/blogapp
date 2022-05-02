import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import{signin} from "../services/user.service"

const SigninPage=(props: any)=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
     const navigate=useNavigate()
     const onSignin=async ()=>{
         if(email.length===0){
             alert(`Enter Email`)
         }else if(password.length===0){
             alert(`Enter Password`)
         }
         else{
             const result=await signin(email,password)
             sessionStorage['token']=result.token
             if(result){
                 navigate('/blog-list')
             }
             else {
                 alert('invalid credentials')
             }
         }
     }
     return (
     <div className="container">
        <h1 className="header">SignIn</h1>
        <div className="form">

           <div className="mb-3">
                <label  className="form-label">Username</label>
                 <input onChange={(e)=>{
                     setEmail(e.target.value)
                      }} type="Email" className="form-control" id="email" />
           </div>
           <div className="mb-3">
                <label  className="form-label">Password</label>
                 <input onChange={(e)=>{
                     setPassword(e.target.value)
                      }}  className="form-control" id="password" />
           </div>
           <div className="mb-3">
           <div>Dont't have an account? Signup <Link to="/signup">here</Link></div> 
            <button onClick={onSignin} className="btn btn-success">SignIn</button>
           </div>
        </div>
      </div>     
     )
}

export default SigninPage