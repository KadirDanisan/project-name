import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  // 1. Kategori Oluşturma
  async createCategory(name: string) {
    return await this.prisma.category.create({
      data: {
        name: name,
      },
    });
  }

  //  createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
  //   return this.prisma.category.create({
  //     data,
  //   });
  // }

  // 2. Kategori Listeleme
  async findAllCategory() {
    return await this.prisma.category.findMany();
  }

  // 3. Kategori Görüntüleme
  async findCategoryById(id: string) {
    return await this.prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        posts: true,
      },
    });
  }

  // 4. Kategori Güncelleme
  async updateCategory(id: number, newName: string) {
    return await this.prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: newName,
      },
    });
  }

  // 5. Kategori Silme
  async deleteCategory(id: number) {
    return await this.prisma.category.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
