import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {UserService} from "../user/user.service";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {ConfigModule} from "@nestjs/config";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports:
      [
          UserModule,
          TypeOrmModule.forFeature([User]),
          ConfigModule.forRoot(),
          JwtModule.register({
              secret: process.env.JWT_SECRET,
              signOptions: { expiresIn: '1d' },
          }),
      ],
  providers: [AuthService,UserService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
