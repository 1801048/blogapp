/* eslint-disable prettier/prettier */
import { Args, Mutation, Query,Resolver } from "@nestjs/graphql";
import { BlogType } from "./types/blog.type";
import {BlogService} from "./blog.service"
import { BlogInputType } from "./types/blog.input";


@Resolver((of) => BlogType)
export class BlogResolver {

    constructor(private blogService: BlogService) {}

    @Query((returns) => BlogType)
    blogs(@Args('id') id:number) {
        return this.blogService.getblog(id)
    }

    @Mutation(returns=>BlogType)
    createblog(@Args('input') input:BlogInputType){
        return this.blogService.createblog(input)
    }
    @Mutation(returns=>BlogType)
    updateblog(@Args('id') id:number,@Args('input') input:BlogInputType){
        return this.blogService.updateblog(id,input)
    }
    @Mutation(returns=>BlogType)
    deleteblog(@Args('id') id:number){
        return this.blogService.deleteblog(id)
    }


}