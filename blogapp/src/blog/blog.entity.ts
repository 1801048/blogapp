

import { ObjectType } from "@nestjs/graphql";
import { UserEntity } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Blog')
@ObjectType()
export class BlogEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    title:string

    @Column()
    description: string

    @Column()
    tags:string

    @ManyToOne(type => UserEntity, user => user.blogs)
    user: UserEntity;

    @Column()
    userId:string

     
}