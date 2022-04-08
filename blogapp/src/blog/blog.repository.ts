/* eslint-disable prettier/prettier */
import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { BlogEntity } from "./blog.entity";
import { BlogInputType } from "./types/blog.input";

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity>
{
    async createBlog(input:BlogInputType){

        //create row in task table(TaskEntity)

        const blog=new BlogEntity()

        blog.title=input.title

        blog.description=input.description

        blog.tags=input.tags

        //blog.user=user

        //create new row

        await blog.save()

        //delete task.user

        return blog;

    }
    async  getBlogbyId(id:number){

        const blog=await this.findOne(id);

        if(!blog){

            throw new NotFoundException(`task not found`)

        }

        return blog;

    }

    async updateBlog(id:number,input:BlogInputType){

        const blog=await this.getBlogbyId(id)

        //console.log(blog)

        blog.title=input.title

        blog.description=input.description

        blog.tags=input.tags

        await blog.save()
        return blog
    }
}