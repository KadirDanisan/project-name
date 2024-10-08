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

  // 1. Post'a Tag Ekleme
  async addTagToPost(postId: number, tagId: number) {
    return await this.prisma.postTag.create({
      data: {
        postId: postId,
        tagId: tagId,
      },
    });
  }

  // 2. Post'tan Tag Silme
  async deleteTagFromPost(postId: number, tagId: number) {
    return await this.prisma.postTag.delete({
      where: {
        postId_tagId: {
          postId: postId,
          tagId: tagId,
        },
      },
    });
  }
}
