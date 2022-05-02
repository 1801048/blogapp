/* eslint-disable prettier/prettier */
import { ObjectType, Field, ID } from "@nestjs/graphql"

@ObjectType('Blog')
export class BlogType{
    @Field((type)=>ID)
    id:String

    @Field()
    title:string

    @Field()
    description:string

    @Field()
    tags:string
}