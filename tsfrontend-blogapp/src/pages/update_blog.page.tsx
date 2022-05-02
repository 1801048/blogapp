import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { updateBlog } from "../services/blog.service"

const UpdateBlogPage= (props: any) => {
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [tags,setTags]=useState('')
    
    
    const {id}  = useParams();
    console.log(id)
    const navigate=useNavigate()
    const updateblog=async()=>{
        if(title.length===0){
            alert('enter username')
        }
        if(description.length===0){
            alert('enter password')
        }else{
            const result=await updateBlog(title,description,tags,id)
            if(result){
                sessionStorage.removeItem('bid')
                navigate('/blog-list')
            }else{
                alert('invalid')
            }
        }
     }
     return (
         <div className="containerf">
         <h1 className="header">Update Task</h1>
            <div className="form">
                <div className="mb-3" >
                 <label  className="form-label">Title</label>
                 <input onChange={(e)=>{
                     setTitle(e.target.value)
                 }} type="text" className="form-control" id="title" />

                </div>
            <div className="mb-3">
                <label  className="form-label">Description</label>
                 <textarea onChange={(e)=>{
                     setDescription(e.target.value)
                 }} rows={5} className="form-control" id="description" ></textarea>

                 </div>
            <div className="mb-3">
                 <label  className="form-label">Tags</label>
                 <input onChange={(e)=>{
                    setTags(e.target.value)
                 }} type="text" className="form-control" id="tags" />

                 </div>
            <div className="mb-3">
                <button onClick={updateblog} className="btn btn-success">Save</button>
                <Link to='/Blog-list' style={{marginLeft:'10px'}} className="btn btn-danger">Cancel</Link>

             </div>
        </div>
 </div>
     )
}

export default UpdateBlogPage