/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Jwtpayload } from "./jwt.payload";
import { UserInput } from "./types/user.input";
import { UserRepository } from "./user.repository";
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) private userRepository:UserRepository,
        private jwtService:JwtService,
    ){}
    async signup(UserInput:UserInput){
        return this.userRepository.signup(UserInput)
    }
    async signin(UserInput:UserInput){
        const user=await this.userRepository.signin(UserInput)
        if(!user){
            throw new NotFoundException(`user not found`)
        }
        const payload:Jwtpayload={username:UserInput.username,id:user.id};
        const token=await this.jwtService.sign(payload);
        
        return { token, user};
}
}