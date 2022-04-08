/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {BlogRepository} from "./blog.repository"
import { BlogInputType } from "./types/blog.input";

@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogRepository) private blogRepository:BlogRepository){}

    async createblog(input:BlogInputType){
        return this.blogRepository.createBlog(input)
    }
    async updateblog(id:number ,input:BlogInputType){
        return this.blogRepository.updateBlog(id,input)
    }
    async getblog(id:number){
        return this.blogRepository.getBlogbyId(id)
    }
    async deleteblog(id:number){
       const result= await this.blogRepository.delete(id)
       if(result.affected==0){
           throw new NotFoundException("blog not found")

       }
       return result
    }
}