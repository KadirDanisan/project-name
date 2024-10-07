import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostTagsService {
  constructor(private prisma: PrismaService) {}

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
