import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // 1. Post Oluşturma
  async createPost(title: string, content: string, categoryId: number) {
    return await this.prisma.post.create({
      data: {
        title: title,
        content: content,
        categoryId: categoryId,
      },
    });
  }

  // 2. Tüm Postları Listeleme
  async findAllPosts() {
    return await this.prisma.post.findMany({
      include: {
        category: true,
        comments: true,
        postTags: true,
      },
    });
  }

  // 3. Post Görüntüleme
  async findPostById(id: string) {
    return await this.prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        category: true,
        comments: true,
        postTags: true,
      },
    });
  }

  // 4. Post Güncelleme
  async updatePost(
    id: number,
    title: string,
    content: string,
    categoryId: number,
  ) {
    return await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
        categoryId: categoryId,
      },
    });
  }

  // 5. Post Silme
  async deletePost(id: number) {
    return await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
