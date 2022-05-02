
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUser } from "../services/user.service"
import Profile from "../components/profile.component"

const GetProfile= (props: any) => {
    const [users,setUser]=useState([])
    const navigate=useNavigate()
    const postprofile=()=>{

        navigate('/postprofile')
    }
    const bloglist=()=>{
        navigate('/blog-list')
    }
    // useEffect(()=>{
    //     loadBlogs()
    // },[])
    // const loadBlogs=async()=>{
    //     const result=await getUser(sessionStorage['userEmail'])
    //     console.log(result)
    //     if(result){
    //         setUser(result)
    //     }
    // }
    return <div className="container">
        <h1 className="header">Profile</h1>
        <div className="card" style={{width:'50rem',display:'flex'}}>
        <div className="card-body">
    
            <p  className="card-text">{sessionStorage.getItem('userEmail')}</p>
            <p  className="card-text">{sessionStorage.getItem('firstname')}</p>
            <p  className="card-text">{sessionStorage.getItem('lastname')}</p>
            <button onClick={postprofile} className="btn btn-success">Update</button>
            <button onClick={bloglist} className="btn btn-success" style={{float:'right'}}>blog_List</button>
        </div>
        </div>      
    </div>
    
}

export default GetProfile