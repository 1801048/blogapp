/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GQLAuthQuard } from './gql.authguard';
import { JwtStrategy } from './jwt.strategy';
import { UserInput } from './types/user.input';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [JwtModule.register({

    secret: 'secret',

    signOptions: {

      expiresIn: 3600,

    },

  }),

  PassportModule.register({

    defaultStrategy: 'jwt',}),TypeOrmModule.forFeature([UserRepository]),],
    controllers: [],
    providers:[UserService,UserResolver,JwtStrategy,UserInput,GQLAuthQuard],
    exports:[JwtStrategy,PassportModule,GQLAuthQuard],
})
export class UserModule {

}
