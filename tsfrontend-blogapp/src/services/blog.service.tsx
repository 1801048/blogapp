import { gql } from "@apollo/client"
import axios from "axios"
//import { title } from "process"
import { settings } from "../config"
import {print} from 'graphql'

// export const getMyBlogs=async ()=>{
//     const token = sessionStorage["token"];
//     const response = await axios({
//     method: "POST",
//     url: settings.server,
//        headers: {
//         Authorization: `Bearer ${token}`,
//     },
//      data: {
//       query: print(gql`
//          query {
//              allMyblogs
//              {
//                   id
//                   title
//                   description 
//                   tags
//                 }
//             }
//         `),
//         variables: {},
//          },
//   });
//     console.log(response.data)
  
//     return response.data;
// }
export const getBlogs = async (title: string) => {
    const token = sessionStorage["token"];
    if (title===undefined) {
      title=""
    }
    const response = await axios({
      method: "POST",
      url: settings.server,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        query: print(gql`
          query ($title: String!) {
            allblogs(input: { title: $title }) {
              id
              title
              description
              tags
            }
          }
        `),
        variables: {
          title: title,
        },
      },
    });
    console.log(response.data)
    return response.data;
  };
     
export const createBlog=async (title: String,description: String,tags: String)=>{
    console.log(title)
    const token=sessionStorage['token']
    const response=await axios({
        method:'POST',
        url:settings.server,
        headers:{
            Authorization:`Bearer ${token}`,
        },
        data:{
            query:print(gql`
            mutation createorupdateBlog($title:String!,$description:String!,$tags:String!){
                createorupdateBlog(input:{
                    title:$title,
                    description:$description,
                    tags:$tags
                }){
                    id
                    title
                    tags
                }
            
            }`),
            variables:{
                title,
                description,
                tags,
            },
        }

    })
    
    return response.data
}
export const postprofile=async (email: String,firstName: String,lastName: String)=>{
  
  const token=sessionStorage['token']

  const response=await axios({
      method:'POST',
      url:settings.server,
      headers:{
          Authorization:`Bearer ${token}`,
      },
      data:{
          query:print(gql`
          mutation updateProfile($email:String!,$firstName:String!,$lastName:String!){
            updateProfile(input:{
                  email:$email,
                  firstName:$firstName,
                  lastName:$lastName
              }){
                  username
                  firstname
                  lastname
              }
          
          }`),
          variables:{
              email,
              firstName,
              lastName,
          },
      }

  })
    const res=response.data.data.updateProfile
    sessionStorage['userEmail']=res.username
    sessionStorage['firstname']=res.firstname
    sessionStorage['lastname']=res.lastname
    console.log(response.data)
    return response.data
}

export const delblog=async (id:String)=>{
  
    const token=sessionStorage['token']
  
    const response=await axios({
        method:'POST',
        url:settings.server,
        // headers:{
        //     Authorization:`Bearer ${token}`,
        // },
        data:{
            query:print(gql`
           mutation deleteBlog($id:String!){
                        deleteBlog(
                            id:$id
                        ){
                        id
                        title
                        description
                        tags
                    }
                    }`),
            variables:{
                id
            },
        }
  
    })
      return response.data
  }

export const updateBlog=async (title: String,description: String,tags: String,id?:string)=>{
    console.log(title)
    const token=sessionStorage['token']
    if (id === undefined) {
        id = "";
      }
    const response=await axios({
        method:'POST',
        url:settings.server,
        headers:{
            Authorization:`Bearer ${token}`,
        },
        data:{
            query:print(gql`
            mutation createorupdateBlog($id:String!,$title:String!,$description:String!,$tags:String!){
                createorupdateBlog(input:{
                    id:$id
                    title:$title,
                    description:$description,
                    tags:$tags
                }){
                    id
                    title
                    tags
                }
            
            }`),
            variables:{
                id,
                title,
                description,
                tags,
            },
        }

    })
    
    return response.data
}