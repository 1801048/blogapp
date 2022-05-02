 import { useNavigate } from "react-router-dom"

const Profile=(props:any)=>{
    const {id,firstname,lastname,username}=props
    const navigate=useNavigate()
    const postprofile=()=>{

        navigate('/postprofile')
    }
    const bloglist=()=>{
        navigate('/blog-list')
    }
    return(<div className="comp"> <div className="container" style={{width:'50rem',display:'flex'}}>
        <div className="card-body">
            <h4 className="card-title">{firstname}</h4>
            <h4 className="card-text">{lastname}</h4>
            <p className="card-text">{username}</p>
            <button onClick={postprofile} className="btn btn-success">Update</button>
            <button onClick={bloglist} className="btn btn-success" style={{float:'right'}}>blog_List</button>

        </div>
    </div>
    </div>)
}
export default Profile