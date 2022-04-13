/* eslint-disable prettier/prettier */
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { UserEntity } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BlogEntity } from "./blog.entity";
import { BlogInputType } from "./types/blog.input";
import { CreateBlogInputType } from "./types/createorupdate.blog";

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity>
{
    async createBlog(user:UserEntity,input:BlogInputType){

        try{
        const blog=new BlogEntity()

        blog.title=input.title

        blog.description=input.description

        blog.tags=input.tags

         blog.user=user
        // blog.userId=user.id
        

        await blog.save()

        delete blog.user

        return blog;
        }
         catch{
            return new BadRequestException();
        }
    }
    async  getBlogbyId(id:number){
    
        const blog=await this.findOne(id);

        if(!blog){

            throw new NotFoundException(`task not found`)

        }

        return blog;
    

    }

    async updateBlog(user:UserEntity,id:number,input:BlogInputType){
        
        const blog=await this.getBlogbyId(id)

        //console.log(blog)

        blog.title=input.title

        blog.description=input.description

        blog.tags=input.tags

        await blog.save()
        return blog
        
        
    }

    async createOrupdateBlog(user:UserEntity,input:CreateBlogInputType){
        const {id,title,description,tags}=input
        if(id===undefined || id===null){
            return this.createBlog(user,input)
        }
        try{
            const targetblog=await this.findOneOrFail(id)
            if(targetblog){
                return this.updateBlog(user,id,input)
            }
        }
        catch{
            return new BadRequestException();
        }
    }
}