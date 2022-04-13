/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

import { BlogRepository } from './blog.repository';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([BlogRepository]),UserModule],
  providers:[BlogService,BlogResolver]
})
export class BlogModule {}
