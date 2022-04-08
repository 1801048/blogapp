/* eslint-disable prettier/prettier */
import { type } from "os";
import { UserEntity } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Blog')
export class BlogEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description: string

    @Column()
    tags:string

    // @Column()
    // userId:number

    // @ManyToOne(type=>UserEntity,user=>user.blogs,{eager:false})
    // user:UserEntity
}