
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { UserEntity } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BlogEntity } from "./blog.entity";
import { BlogFilter } from "./types/blog.filter";
import { BlogInputType } from "./types/blog.input";
import { CreateBlogInputType } from "./types/createorupdate.blog";

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity>
{
    async createBlog(user:UserEntity,input:BlogInputType){

        
        const blog=new BlogEntity()

        blog.title=input.title

        blog.description=input.description

        blog.tags=input.tags

        
        blog.user=user
        blog.userId=user.id
        

        const result=await this.save(blog);
        return result;
        
    }
    async  getBlogbyId(id:String){
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
    

    async updateBlog(user:UserEntity,id:String,input:BlogInputType){
        
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
        if(id===undefined || id===null ){
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
    async allMyBlogs() {

        try {
            const query=this.createQueryBuilder('blogs')
            const result= await query.getMany()
            return result

        }
        catch{
            throw new NotFoundException();
        }
    
      }
      async allBlogs(input: BlogFilter) {
        const allBlog = await this.find();
        const query = this.createQueryBuilder('blog');
        if (input.tags == null && input.title == null) {
          return allBlog;
        }
        if (input.title === '') {
          return allBlog;
        }
        if (input.tags) {
          query.andWhere(`tags= :tags`, { tags: input.tags });
          const blog = query.getMany();
          return await blog;
        }
        if (input.title) {
          query.andWhere(`title= :title`, { title: input.title });
          const blog = query.getMany();
    
          return await blog;
        }
        return allBlog;
      }
}