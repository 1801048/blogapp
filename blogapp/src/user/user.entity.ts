
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as crypto from "crypto-js";
import { BlogEntity } from "src/blog/blog.entity";
import { Field } from "@nestjs/graphql";

@Entity('User')
@Unique(['username'])
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string


    @Column()
    username:string

    @Column()
    firstname:string

    @Column()
    lastname:string

    @Column()
    password:string

    @OneToMany(type => BlogEntity, blog => blog.user, { eager: true, onDelete: 'SET NULL' })
    blogs: BlogEntity[];

    validatePassword(password:string){
        const encrypted=`${crypto.MD5(password)}`
        return encrypted==this.password
    }
}