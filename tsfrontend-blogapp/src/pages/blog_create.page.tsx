import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createBlog } from "../services/blog.service"

const BlogCreatePage= (props: any) => {
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const navigate=useNavigate()
    const [tags,setTags]=useState('')
    const onCreateBlog=async()=>{
        if(title.length===0){
            alert('enter username')
        }else if(description.length===0){
            alert('enter password')
        }else{
            const result=await createBlog(title,description,tags)
            console.log(result)
            if(result.errors && result.errors.length>0){
                const error=result.errors[0].message
                alert(error)
            }else{
                if(result.data){
                    navigate('/blog-list')
                }
            }
        }
    }
    return (

        <div>
           <h1 className="header">Create Blog</h1>
                <div className="form">
                <div className="mb-3">
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
          <label className="form-label">Blog Tags</label>
          <button
            className="btn btn-sm btn-primary m-2"
            value={"FOOD"}
            onClick={(e) => {
              setTags("FOOD");
            }}
          >
            FOOD
          </button>

          <button
            className="btn btn-sm btn-info m-2"
            value={"SPORTS"}
            onClick={(e) => {
              setTags("SPORTS");
            }}
          >
            SPORTS
          </button>
          <button
            className="btn btn-sm btn-warning m-2"
            value={"TRAVEL"}
            onClick={(e) => {
              setTags("TRAVEL");
            }}
          >
            TRAVEL
          </button>

          <button
            className="btn btn-sm btn-secondary m-2"
            value={"NEWS"}
            onClick={(e) => {
              setTags("NEWS");
            }}
          >
            NEWS
          </button>
          <button
            className="btn btn-sm btn-success m-2"
            value={"FINANCE"}
            onClick={(e) => {
              setTags("FINANCE");
            }}
          >
            FINANCE
          </button>
        </div>

                <div className="mb-3">
    
                    <button onClick={onCreateBlog} className="btn btn-success">Save</button>
                     <Link to='/blog-list' style={{marginLeft:'10px'}} className="btn btn-danger">Cancel</Link>
    
                </div>
    
            </div>
    
        </div>
    
        )
}

export default BlogCreatePage