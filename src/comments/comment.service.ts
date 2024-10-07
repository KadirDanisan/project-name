import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComment(content: string, commenter: string, postId: number) {
    return await this.prisma.comment.create({
      data: {
        content: content,
        commenter: commenter,
        postId: postId,
      },
    });
  }

  async findAllComments() {
    return await this.prisma.comment.findMany({
      include: {
        post: true,
      },
    });
  }

  async findCommentById(id: string) {
    return await this.prisma.comment.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        post: true,
      },
    });
  }

  async updateComment(
    id: number,
    content: string,
    commenter: string,
    postId: number,
  ) {
    return await this.prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        content: content,
        commenter: commenter,
        postId: postId,
      },
    });
  }
}
