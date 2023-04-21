import {Controller, Post, UseGuards, Request, Get, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";

import {AuthGuard} from "@nestjs/passport";
import {Response} from "express";

@Controller('auth')
export class AuthController {
    constructor(private authServ:AuthService) {
    }
    @UseGuards(AuthGuard('local'))
    @Post('login')
    signIn(@Request()req,@Res() resp:Response)
{const jwt=req.user;
    resp.setHeader('Set-Cookie',[jwt]).json();
    return req.user;///this.authServ.signIn(loginDTO.email,loginDTO.password);
}
@UseGuards(AuthGuard('jwt'))
@Get('profile')
    profile(@Request()req)
{
    return req.user;
}
}
