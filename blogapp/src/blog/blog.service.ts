
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/user.entity";
import {BlogRepository} from "./blog.repository"
import { BlogFilter } from "./types/blog.filter";
import { BlogInputType } from "./types/blog.input";
import { CreateBlogInputType } from "./types/createorupdate.blog";

@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogRepository) private blogRepository:BlogRepository){}

    async createBlog(user:UserEntity,input:CreateBlogInputType){
        return this.blogRepository.createOrupdateBlog(user,input)
    }
    async updateBlog( user:UserEntity,input:CreateBlogInputType){
        return this.blogRepository.createOrupdateBlog(user,input)
    }
    async getBlog(id:String){
        return this.blogRepository.getBlogbyId(id)
    }
    async allBlogs(BlogFilter:BlogFilter){
        return this.blogRepository.allBlogs(BlogFilter)
    }
    async allMyBlogs(){
        return this.blogRepository.allMyBlogs()
    }
    async deleteBlog(id:string){
       const result= await this.blogRepository.delete(id)
       if(result.affected==0){
           throw new NotFoundException("blog not found")

       }
       return result
    }
}