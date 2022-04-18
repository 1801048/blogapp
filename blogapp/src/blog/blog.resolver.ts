
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

export class BlogResolver {

    constructor(private blogService: BlogService) {}

    @Query((returns) => BlogType)
    getBlogs(@Args('id') id:number) {
        
        return this.blogService.getBlog(id)
    }

    @UseGuards(GQLAuthQuard)
    @Query((returns) => [BlogType])
    allBlogs(@GetUser() user:UserEntity,@GetBlog() blogs:BlogEntity) {
        
        return user.blogs
    }

    @UseGuards(GQLAuthQuard)
    @Mutation(returns=>BlogType)
    createorupdateBlog(@GetUser() user:UserEntity,@Args('input') input:CreateBlogInputType){
        return this.blogService.createBlog(user,input)
    }

    @UseGuards(GQLAuthQuard)
    @Mutation(returns=>BlogType)
    updateBlog(@GetUser() user:UserEntity,@Args('input') input:CreateBlogInputType){
        return this.blogService.updateBlog(user,input)
    }
    @Mutation(returns=>BlogType)
    deleteBlog(@Args('id') id:number){
        return this.blogService.deleteBlog(id)
    }


}