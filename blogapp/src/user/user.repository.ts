
import { Entity, EntityRepository, Repository } from "typeorm";
import { UserInput } from "./types/user.input";
import { UserEntity } from "./user.entity";
import * as crypto from 'crypto-js';
import { BadRequestException } from "@nestjs/common";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>
{
    async signup(UserInput:UserInput) {
        try{
        const user=new UserEntity()
        user.username=UserInput.username
        user.password=`${crypto.MD5(UserInput.password)}`;
        const result=await user.save()
        return result
        }
        catch{
            throw new BadRequestException();
        }
    }
    async signin(UserInput:UserInput){
        const {username,password}=UserInput
        
        const query=this.createQueryBuilder('users')
          query.andWhere('users.username=:username',{username:username})
          const user=await query.getOneOrFail()

        //const user=await this.findOne({username:username})
        if(user && user.validatePassword(password)){
            return user
        }
        return null
    
    
    }
}