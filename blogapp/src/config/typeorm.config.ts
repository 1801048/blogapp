/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm"
export const TypeORMConfiguration: TypeOrmModuleOptions = {
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'12345678',
    database:'blogs',
    entities: [__dirname +'/../**/*.entity.{ts,js}'],
    synchronize: false,
};