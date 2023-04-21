import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {User} from "../entities/user.entity";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService
{
    constructor(private  userService:UserService, private jwtServ:JwtService) {
    }
    async signIn(email:string,password:string)
    {
        const  user:User=await this.userService.findByEmail(email);
        if(!user)throw  new  NotFoundException("User with this email does not exist");
       if(!await (bcrypt.compare(password,user.password))) throw  new BadRequestException("Passwords do not match")

       const payload={"email":user.email,"sub":user.id};
       const accToken=this.jwtServ.sign(payload);
       return accToken;
       // return user;
    }

}
