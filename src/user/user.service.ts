import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {DeleteResult, Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService
{
    constructor( @InjectRepository(User) private  readonly  userRepository:Repository<User>)
    {
    }
   async findAll():Promise<User[]>
    {
        return this.userRepository.find();
    }
    async create(createUserDTO:CreateUserDto):Promise<User>
    {const hashed=await bcrypt.hash(createUserDTO.password,10);
        const  data={...createUserDTO,password:hashed};
       const  newUser:User=this.userRepository.create(data);
       return this.userRepository.save(newUser);
    }
    async delete(id:number):Promise<DeleteResult>
    {
        return  this.userRepository.delete(id);
    }
    async findByID(id:number):Promise<User>
    {
        return  this.userRepository.findOneBy({id})
    }
    async findByEmail(email:string):Promise<User>
    {
        return  this.userRepository.findOneBy({email})
    }
    async update(id:number,updateDTO:UpdateUserDto):Promise<User>
    {
        await this.userRepository.update(id,updateDTO);
        return  this.findByID(id);
    }

}
