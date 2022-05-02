
import { Entity, EntityRepository, Repository } from "typeorm";
import { UserInput } from "./types/user.input";
import { UserEntity } from "./user.entity";
import * as crypto from 'crypto-js';
import { BadRequestException } from "@nestjs/common";
import { UserProfileInput } from "./types/profile.input";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>
{
    async signup(UserInput:UserInput) {
        try{
        const user=new UserEntity()
        user.username=UserInput.username
        user.firstname=UserInput.firstname
        user.lastname=UserInput.lastname
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
    async getuserprofile(userEmail:string)
    {
        const query=this.createQueryBuilder('users')
        query.andWhere('users.username=:userEmail',{userEmail:userEmail})
        const result=await query.getOneOrFail()
        return result
    }

    async updateProfile(user: UserEntity, input: UserProfileInput) {
        user.username = input.email;
        user.firstname = input.firstName;
        user.lastname = input.lastName;
    
        const result = user.save();
        return result;
      }
}