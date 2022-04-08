/* eslint-disable prettier/prettier */
import { Entity, EntityRepository, Repository } from "typeorm";
import { UserInput } from "./types/user.input";
import { UserEntity } from "./user.entity";
import * as crypto from 'crypto-js';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>
{
    async signup(UserInput:UserInput) {
        const user=new UserEntity()
        user.username=UserInput.username
        user.password=`${crypto.MD5(UserInput.password)}`;
        await user.save()
        return user
    }
    async signin(UserInput:UserInput){
        const {username,password}=UserInput
        const user=await this.findOne({username:username})
        if(user && user.validatePassword(password)){
            return user
        }
        return null
    }
}