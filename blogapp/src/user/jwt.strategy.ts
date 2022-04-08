/* eslint-disable prettier/prettier */
import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import {Strategy,ExtractJwt} from 'passport-jwt';
import {Jwtpayload} from './jwt.payload';
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'secret',
        });
    }
    async validate(payload:Jwtpayload){
        const user=this.userRepository.findOne({id:payload.id});
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}