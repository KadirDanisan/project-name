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
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Post Oluşturma
  @Post()
  async create(
    @Body() body: { title: string; content: string; categoryId: number },
  ) {
    return await this.postsService.createPost(
      body.title,
      body.content,
      body.categoryId,
    );
  }

  // Tüm Postları Listeleme
  @Get()
  @Render('category')
  async findAll() {
    const posts = await this.postsService.findAllPosts();
    return { posts };
  }

  // Post Görüntüleme
  @Get('/:id')
  @Render('post')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findPostById(id);
    return { post };
  }

  // Post Güncelleme
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { title: string; content: string; categoryId: number },
  ) {
    return await this.postsService.updatePost(
      id,
      body.title,
      body.content,
      body.categoryId,
    );
  }

  // Post Silme
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.postsService.deletePost(id);
  }

  // Post'a Tag Ekleme
  @Post(':postId/tags/:tagId')
  async addTag(@Param('postId') postId: number, @Param('tagId') tagId: number) {
    return await this.postsService.addTagToPost(postId, tagId);
  }

  // Post'tan Tag Silme
  @Delete(':postId/tags/:tagId')
  async removeTag(
    @Param('postId') postId: number,
    @Param('tagId') tagId: number,
  ) {
    return await this.postsService.deleteTagFromPost(postId, tagId);
  }
}
