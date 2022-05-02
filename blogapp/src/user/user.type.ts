
import { Field,  ObjectType } from "@nestjs/graphql";

@ObjectType('User')
export class UserType{
    @Field()
    id:string

    @Field()
    username:string

    @Field()
    firstname:string

    @Field()
    lastname:string
}