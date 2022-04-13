/* eslint-disable prettier/prettier */
import { Args, Mutation, Query,Resolver } from "@nestjs/graphql";
import { BlogType } from "./types/blog.type";
import {BlogService} from "./blog.service"
import { BlogInputType } from "./types/blog.input";
import { GetBlog } from "./get.blog.decorator";
import { BlogEntity } from "./blog.entity";
import { UserEntity } from "src/user/user.entity";
import { GetUser } from "src/user/get.user.decorator";
import { CreateBlogInputType } from "./types/createorupdate.blog";
import { UseGuards } from "@nestjs/common";
import { GQLAuthQuard } from "src/user/gql.authguard";


@Resolver((of) => BlogType)
@UseGuards(GQLAuthQuard)
export class BlogResolver {

    constructor(private blogService: BlogService) {}

    @Query((returns) => [BlogType])
    blogs(@Args('id') id:number) {
        return this.blogService.getblog(id)
    }
    @Query((returns) => [BlogType])
    allblogs(@GetUser() user:UserEntity,@GetBlog() blogs:BlogEntity) {
        console.log(user.blogs)
        return user.blogs
    }


    @Mutation(returns=>BlogType)
    createorupdateblog(@GetUser() user:UserEntity,@Args('input') input:CreateBlogInputType){
        return this.blogService.createblog(user,input)
    }
    @Mutation(returns=>BlogType)
    updateblog(@GetUser() user:UserEntity,@Args('input') input:CreateBlogInputType){
        return this.blogService.updateblog(user,input)
    }
    @Mutation(returns=>BlogType)
    deleteblog(@Args('id') id:number){
        return this.blogService.deleteblog(id)
    }


}