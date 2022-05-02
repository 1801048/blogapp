import axios from "axios"
import { settings } from "../config";
import { print } from "graphql";
import { gql } from "@apollo/client"

export const signup=async (firstname:string,lastname:string,username:string,password:string)=>{
    const url=settings.server
    console.log(firstname,lastname,username,password)
    const result=await axios({
        url:url,
        method:'POST',
        data:{
            query: print(gql `
            mutation ($firstname:String!,$lastname:String!,$username:String!, $password:String!){
            signup(input:{
                firstname:$firstname
                lastname:$lastname
                username:$username
                password:$password
            })
            {
                username
                id
                firstname
                lastname
            
            }
        },
        `),
        variables:{
            firstname:firstname,
            lastname:lastname,
            username:username,
            password:password,
        }
    }
})
console.log(result.data.data)
return result.data;
        
}


export const signin=async (email: string,password: string)=>{
    const url=settings.server
    const result=await axios({
        url:url,
        method:'POST',
        data:{
            query: print(gql `
            mutation ($email:String!, $password:String!){
            signin(input:{
                username:$email
                password:$password
            })
            {
                token
                user{
                    id
                    username
                    firstname
                    lastname
                }
  	
            }
        },
        `),
        variables:{
            email:email,
            password:password,
        }
    }
        
    })
    const res=result.data.data.signin.user
    sessionStorage['uid']=res.id
    sessionStorage['userEmail']=res.username
    sessionStorage['firstname']=res.firstname
    sessionStorage['lastname']=res.lastname
    console.log(result.data.data)
    return result.data.data.signin;
}
export const getUser=async (userEmail:string)=>{
    const token = sessionStorage["token"];
    const response = await axios({
    method: "POST",
    url: settings.server,
       headers: {
        Authorization: `Bearer ${token}`,
    },
     data: {
      query: print(gql`
         query($userEmail:String!){
            profile(userEmail:$userEmail)
            {
                id
                username
                firstname
                lastname
            }
            }
        `),
        variables: {
            userEmail:userEmail
        },
         },
  });
    console.log(response.data)
  
    return response.data.data.profile;
  
  
}