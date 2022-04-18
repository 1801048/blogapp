
import { createParamDecorator } from "@nestjs/common";

export const GetBlog=createParamDecorator((data,obj)=>{
    if(obj.args.length>0){
        const request=obj.args[2].req
        return request.blog;
    }
    return null
})