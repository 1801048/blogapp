
import {  UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Query,Args, Mutation, Resolver } from "@nestjs/graphql";
import { SingleFieldSubscriptionsRule } from "graphql";
import { GetUser } from "./get.user.decorator";
import { GQLAuthQuard } from "./gql.authguard";
import { SigninResponse } from "./signin.response";
import { UserProfileInput } from "./types/profile.input";
import { UserInput } from "./types/user.input";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { UserType } from "./user.type";

@Resolver((of)=>UserType)
export class UserResolver{
    constructor(private userService:UserService){}

        @Mutation((returns) =>UserType)
        @UsePipes(ValidationPipe)
        signup(@Args('input') input:UserInput){
            return this.userService.signup(input);
        }
        @Mutation((returns) =>SigninResponse)
        @UsePipes(ValidationPipe)
        signin(@Args('input') input:UserInput){
            return this.userService.signin(input);
        }

        @Query(returns =>UserType)
        @UseGuards(GQLAuthQuard)
        profile(@Args('userEmail') userEmail:string){
            return this.userService.getuserprofile(userEmail)
        }
        @Mutation((returns) => UserType)
        @UseGuards(GQLAuthQuard)
        updateProfile(
          @GetUser() user: UserEntity,
          @Args('input') input: UserProfileInput,
        ) {
          return this.userService.updateProfile(user, input);
        }
}