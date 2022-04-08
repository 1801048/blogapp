/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class BlogInputType{
    @Field()
    title:string;
    @Field()
    description:string;
    @Field()
    tags:string;
}