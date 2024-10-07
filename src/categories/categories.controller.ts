import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Render,
  Param,
  Body,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  //Kategori Oluşturma
  @Post()
  async create(@Body('name') name: string) {
    return await this.categoriesService.createCategory(name);
  }

  // Kategori Listeleme
  @Render('categories')
  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAllCategory();
    return { categories };
  }

  // Kategori Görüntüleme
  @Render('category')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findCategoryById(id);
    return { category };
  }

  // Kategori Güncelleme
  @Patch(':id')
  async update(@Param('id') id: number, @Body('name') newName: string) {
    return await this.categoriesService.updateCategory(id, newName);
  }

  // Kategori Silme
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.categoriesService.deleteCategory(id);
  }
}
