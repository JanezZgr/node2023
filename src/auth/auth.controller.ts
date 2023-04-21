import { Controller, Post, UseGuards,Request} from '@nestjs/common';
import {AuthService} from "./auth.service";

import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private authServ:AuthService) {
    }
    @UseGuards(AuthGuard('local'))
    @Post('login')
    signIn(@Request()req)
{
    return req.user;///this.authServ.signIn(loginDTO.email,loginDTO.password);
}
}
