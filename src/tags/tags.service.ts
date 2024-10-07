import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}
  // 1. Tag Oluşturma
  async createTags(name: string) {
    return await this.prisma.tag.create({
      data: {
        name: name,
      },
    });
  }

  // 2. Tüm Tagları Listeleme
  async findAllTags() {
    return await this.prisma.tag.findMany({
      include: {
        postTags: true,
      },
    });
  }

  // 3. Tag Görüntüleme
  async findTagsById(id: string) {
    return await this.prisma.tag.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        postTags: true,
      },
    });
  }

  // 4. Tag Güncelleme
  async updateTags(id: number, name: string) {
    return await this.prisma.tag.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }

  // 5. Tag Silme (isteğe bağlı)
  async deleteTags(id: number) {
    return await this.prisma.tag.delete({
      where: {
        id: id,
      },
    });
  }
}
