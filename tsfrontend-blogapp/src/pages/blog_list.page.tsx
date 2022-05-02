
import { useEffect, useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import { delblog, getBlogs} from "../services/blog.service"
import {DropdownButton,Dropdown} from 'react-bootstrap'
import Blog from "../components/blog.components"


const BlogListPage= (props: any) => {
    const [blogs,setBlogs]=useState([])
    const [search,setSearch]=useState('')
    const navigate=useNavigate()
    useEffect(()=>{
        loadBlogs()
    },[])
     const loadBlogs=async()=>{
        const result=await getBlogs(search)
        console.log(result)
        if(result){
            setBlogs(result.data.allblogs)
        }
    }
    const  logout=()=>{
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('uid')
        sessionStorage.removeItem('userEmail')
        sessionStorage.removeItem('firstname')
        sessionStorage.removeItem('lastname')
        navigate('/signin')
    }
    async function dblog(id: any)
    {
        console.log(id)
        const result=await delblog(id)
        if(result){
            loadBlogs()
        }
    }
    async function searchsearch()
    {
        const result=await getBlogs(search)
        if(result){
            setBlogs(result.data.allblogs)
        }
    }
    return <div >
        <DropdownButton id="dropdown-basic-button" title="User" style={{float:'right'}}>
         <Dropdown.Item href="/profilepage">Profile</Dropdown.Item>
         <Dropdown.Item href="/create-blog">Create Blog</Dropdown.Item>  
         <Dropdown.Item onClick={logout} href="#/action-2">Logout</Dropdown.Item>     
        </DropdownButton>
        <h1 className="header">Blogs List</h1>
        <div><input className="btn btn-outline-info" type="text" style={{margin:'10px',width:'75%'}} onChange={ 
                            (e)=>{
                                setSearch(e.target.value)
                            }}  /><button onClick={loadBlogs} style={{margin:'10px',width:'20%'}} className="btn btn-outline-info">Search</button></div> <br />
                            <div>{blogs.map((blog)=>{
                               const  {id,title,description,tags,userid}=blog
                                return<Blog key={id} id={id} title={title} description={description} tags={tags}
                                 userid={userid} dblog={dblog}/>
                            })}</div>
             
    </div>
    }

export default BlogListPage