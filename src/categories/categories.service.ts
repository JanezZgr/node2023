import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "../entities/category.entity";
import {DeleteResult, Repository} from "typeorm";

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly catRepository:Repository<Category>) {
  }
 async create(createCategoryDto: CreateCategoryDto):Promise<Category> {
   const newCat=this.catRepository.create(createCategoryDto);
   return this.catRepository.save(newCat);
  }

 async findAll():Promise<Category[]> {
    return this.catRepository.find();
  }

 async findByID(id: number):Promise<Category> {
    return this.catRepository.findOneBy({id});
  }

 async update(id: number, updateCategoryDto: UpdateCategoryDto):Promise<Category> {
    await this.catRepository.update(id,updateCategoryDto);
    return this.findByID(id);
  }

 async remove(id: number):Promise<DeleteResult> {
    return await this.catRepository.delete(id);

  }
}
