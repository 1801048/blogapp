/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class BlogInputType{
    @Field({nullable:true})
    title:string;
    @Field({nullable:true})
    description:string;
    @Field({nullable:true})
    tags:string;
}