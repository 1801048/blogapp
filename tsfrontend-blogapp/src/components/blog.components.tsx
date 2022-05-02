import { useNavigate } from "react-router-dom"
import { delblog } from "../services/blog.service"

const Blog=(props: any)=>{
    const {id,title,description,tags,userid,dblog}=props
    console.log(id)
    const navigate=useNavigate()
    
    
    
    const deleteblog=async()=>{
        const uid=id
        const result=await dblog(uid)
    }
    return <div className="container"> <div className="card" style={{width:'50rem',display:'flex'}}>
                <div className="card-body">
                 <h5 className="card-title">{title}</h5>
                 <p aria-rowspan={5} className="card-text">{description}</p>
                 <p className="card-text">{tags}</p>
                 <a href={`/update-blog/${id}`}  className="btn btn-warning">Update</a>
                 <button onClick={deleteblog} className="btn btn-danger" style={{float:'right'}}>Delete</button>
                </div>
            </div>
            </div>
}
export default Blog