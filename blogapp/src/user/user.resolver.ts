/* eslint-disable prettier/prettier */
import {  UseGuards } from "@nestjs/common";
import { Query,Args, Mutation, Resolver } from "@nestjs/graphql";
import { SingleFieldSubscriptionsRule } from "graphql";
import { GetUser } from "./get.user.decorator";
import { GQLAuthQuard } from "./gql.authguard";
import { SigninResponse } from "./signin.response";
import { UserInput } from "./types/user.input";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { UserType } from "./user.type";

@Resolver((of)=>UserType)
export class UserResolver{
    constructor(private userService:UserService){}

        @Mutation((returns) =>UserType)
        signup(@Args('input') input:UserInput){
            return this.userService.signup(input);
        }
        @Mutation((returns) =>SigninResponse)
        signin(@Args('input') input:UserInput){
            return this.userService.signin(input);
        }

        @Query(returns =>UserType)
        @UseGuards(GQLAuthQuard)
        profile(@GetUser() user:UserEntity){
            return user
        }
    
}