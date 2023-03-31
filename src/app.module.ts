import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [UserModule, DatabaseModule,TypeOrmModule.forRoot(
      {
        type:'postgres',
        host:'localhost',
        port:5432,
        username:'postgres',
        password:'postgres',
        database:'node23',
          autoLoadEntities:true,
          entities:[],
          synchronize:true
      })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
