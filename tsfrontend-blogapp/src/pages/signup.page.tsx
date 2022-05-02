import { useState } from "react"
import {Link, useNavigate } from "react-router-dom"
import {signup} from '../services/user.service'

const SignupPage=(props: any)=>{
    const [firstname,setFirstname]=useState('')
    const [lastname,setLastname]=useState('')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
   
     const navigate=useNavigate()
     const onSignup=async ()=>{
         if(firstname.length===0){
             alert(`Enter Username`)
         }else if(lastname.length===0){
             alert(`Enter lastname`)
         }else if(username.length===0){
             alert(`Enter Email`)
         }else if(password.length===0){
             alert(`Password is not strong`)
         }
         else{
             const result=await signup(firstname, lastname, username, password)
             if(result){
                 navigate('/signin')
             }
         }
     }
     return (

        <div className="container">
        <h1 className="header">SignUp</h1>
        <div className="form">

           <div className="mb-3">
                <label  className="form-label">First Name</label>
                 <input onChange={(e)=>{
                     setFirstname(e.target.value)
                      }} type="text" className="form-control" id="firstname" />
           </div>
           <div className="mb-3">
                <label  className="form-label">Last Name</label>
                 <input onChange={(e)=>{
                     setLastname(e.target.value)
                      }} type="text" className="form-control" id="lastname" />
           </div>
           <div className="mb-3">
                <label  className="form-label">Username</label>
                 <input onChange={(e)=>{
                     setUsername(e.target.value)
                      }} type="username" className="form-control" id="username" />
           </div>
           <div className="mb-3">
                <label  className="form-label">Password</label>
                 <input onChange={(e)=>{
                     setPassword(e.target.value)
                      }} type="password" className="form-control" id="exampleInputPassword1" />
           </div>
           <div className="mb-3">
           <div>Already have an account? Signin <Link to="/signin">here</Link></div> 
            <button onClick={onSignup} className="btn btn-success">SignUp</button>    
           </div>
        
        </div>
     </div>
     )  
  }
export default SignupPage        
  