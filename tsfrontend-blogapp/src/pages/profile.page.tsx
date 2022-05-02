import { useState } from "react"
import {Link, useNavigate } from "react-router-dom"
import { postprofile } from "../services/blog.service"

const ProfilePage= (props: any) => {
    const id=sessionStorage.getItem('uid')
    const [firstname,setFirstname]=useState('')
    const [lastname,setLastname]=useState('')
    const [email,setEmail]=useState('')
    
    const navigate=useNavigate()
    const postprofileofuser =async ()=>{
        if(firstname.length===0){
            alert(`Enter Username`)
        }else if(lastname.length===0){
            alert(`Enter lastname`)
        }else if(email.length===0){
            alert(`Enter Email`)
        
        }else{
            const result=await postprofile(email,firstname, lastname)
            if(result){

                navigate('/blog-list')
            }
        }
    }
    return (

       <div >
       <h1 className="header">User Profile</h1>
       <div className="form">

          <div className="mb-3">
               <label  className="form-label">Email</label>
                <input onChange={(e)=>{
                    setEmail(e.target.value)
                     }} type="text" className="form-control" />
          </div>
          <div className="mb-3">
               <label  className="form-label">First Name</label>
                <input onChange={(e)=>{
                    setFirstname(e.target.value)
                     }} type="text" className="form-control" />
          </div>
          <div className="mb-3">
               <label  className="form-label">Last Name</label>
                <input onChange={(e)=>{
                    setLastname(e.target.value)
                     }} type="email" className="form-control"  aria-describedby="emailHelp"/>
          </div>
          
           <button onClick={postprofileofuser} type="submit" className="btn btn-primary">Submit</button>
           <Link to='/Blog-list' style={{marginLeft:'10px'}} className="btn btn-danger">Cancel</Link>    
        </div>
       </div>)
}

export default ProfilePage