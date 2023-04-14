import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {User} from "../entities/user.entity";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {DeleteResult} from "typeorm";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
export class UserController
{
    constructor(private  readonly userService:UserService)
    {
    }
@Get()
  async  findAll()   :Promise<User[]>
{
return this.userService.findAll();
}
@Get('id')
    async findByID(@Param('id') id:number):Promise<User>
{
    return  this.userService.findByID(id);
}
@Post()
    async create(@Body() createDTO:CreateUserDto):Promise<User>
{
    return  this.userService.create(createDTO);
}
@Delete('id')
    async delete(@Param('id') id:number):Promise<DeleteResult>
{
    return this.userService.delete(id);
}
@Patch('id')
    async update(@Param('id') id:number,@Body() updateDTO:UpdateUserDto):Promise<User>
{
    return this.userService.update(id,updateDTO);
}




}
