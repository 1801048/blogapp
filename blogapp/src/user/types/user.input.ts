/* eslint-disable prettier/prettier */
import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, Matches, MinLength } from "class-validator";

@InputType()
export class UserInput {
    @MinLength(5)
    @IsNotEmpty()
    @Field()
    username:string

    @MinLength(8)
    @IsNotEmpty()
    //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    @Field()
    password:string
}