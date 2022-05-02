
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
import { BlogFilter } from "./types/blog.filter";


@Resolver(() => BlogType)

export class BlogResolver {

    constructor(private blogService: BlogService) {}

    @Query((returns) => BlogType)
    getBlogs(@Args('id') id:String) {
        
        return this.blogService.getBlog(id)
    }

   /* @UseGuards(GQLAuthQuard)
    @Query((returns) => [BlogType])
    allBlogs(@GetUser() user:UserEntity,@GetBlog() blogs:BlogEntity) {
        
        return user.blogs
    }*/

    @UseGuards(GQLAuthQuard)
    @Mutation(returns=>BlogType,{nullable:true})
    createorupdateBlog(@GetUser() user:UserEntity,@Args('input') input:CreateBlogInputType){
        console.log(user.id)
        return this.blogService.createBlog(user,input)
    }

    @UseGuards(GQLAuthQuard)
    @Mutation(returns=>BlogType)
    updateBlog(@GetUser() user:UserEntity,@Args('input') input:CreateBlogInputType){
        return this.blogService.updateBlog(user,input)
    }
    @Mutation(returns=>BlogType)
    deleteBlog(@Args('id') id:string){
        return this.blogService.deleteBlog(id)
    }
    @UseGuards(GQLAuthQuard)
    @Query((returns) => [BlogType])
    allMyblogs() {
      return this.blogService.allMyBlogs();

     }
     @UseGuards(GQLAuthQuard)
    @Query((returns) => [BlogType])
    allblogs(@Args('input') input: BlogFilter) {
      return this.blogService.allBlogs(input);

    }

}