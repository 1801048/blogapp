/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class CreateBlogInputType{
    @Field({nullable:true})
    id:number
    @Field()
    title:string;
    @Field()
    description:string;
    @Field()
    tags:string;
}