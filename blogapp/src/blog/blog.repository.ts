
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
        
        

       const result= await blog.save()
        

       


        return result;
        }
         catch{
            throw new BadRequestException();
        }
    }
    async  getBlogbyId(id:number){
          try{
          const query=this.createQueryBuilder('blogs')
          query.andWhere('blogs.id=:id',{id:id})
          const blog=query.getOneOrFail()
          if(blog){
              return blog
          }
          }
          catch{
              throw new NotFoundException()
          }
        //const blog=await this.findOne(id);

       
    

    }
    

    async updateBlog(user:UserEntity,id:number,input:BlogInputType){
        
        const blog=await this.getBlogbyId(id)

        //console.log(blog)

        blog.title=input.title

        blog.description=input.description

        blog.tags=input.tags

       const result= await blog.save()
        return result
        
        
    }

    async createOrupdateBlog(user:UserEntity,input:CreateBlogInputType){
        const {id,title,description,tags}=input
        if(id===undefined || id===null){
            return this.createBlog(user,input)
        }
        try{
            const targetblog=await this.getBlogbyId(id)
            if(targetblog){
                return this.updateBlog(user,id,input)
            }
        }
        catch{
            throw new BadRequestException();
        }
    }
}