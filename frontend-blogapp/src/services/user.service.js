import axios from "axios"
import { settings } from "../config";
import { print } from "graphql";
import { gql } from "@apollo/client"

export const signup=async (firstname,lastname,email,password)=>{
    const url=settings.server
    console.log(firstname,lastname)
    const result=await axios({
        url:url,
        method:'POST',
        data:{
            query: print(gql `
            mutation ($firstname:String!,$lastname:String!,$email:String!, $password:String!){
            signup(input:{
                firstname:"shubham"
                lastname:"thorat"
                username:"sthorat"
                password:"12345678"
            })
            {
                username
                id
            
            }
        },
        `),
        variables:{
            firstname:firstname,
            lastname:lastname,
            username:email,
            password:password,
        }
    }
})
console.log(result.data.data)
    return result.data;
        
}


export const signin=async (email,password)=>{
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
    console.log(result.data.data)
    return result.data.data.signin;
}