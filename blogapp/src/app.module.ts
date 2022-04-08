/* eslint-disable prettier/prettier */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { graphql } from 'graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { TypeORMConfiguration } from './config/typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [BlogModule, UserModule, TypeOrmModule.forRoot(TypeORMConfiguration),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver:ApolloDriver,
    autoSchemaFile:true,
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
