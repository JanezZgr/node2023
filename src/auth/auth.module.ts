import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {UserService} from "../user/user.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports:
      [
          UserModule,
          TypeOrmModule.forFeature([User]),
          JwtModule.register({
              secret: jwtConstants.secret,
              signOptions: { expiresIn: '60s' },
          }),
      ],
  providers: [AuthService,UserService],
  controllers: [AuthController]
})
export class AuthModule {}
