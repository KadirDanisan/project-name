import { Controller, Post, Delete, Param } from '@nestjs/common';
import { PostTagsService } from './post_tags.service';

@Controller('posts')
export class PostTagsController {
  constructor(private readonly postTagsService: PostTagsService) {}

  // Post'a Tag Ekleme
  @Post(':postId/tags/:tagId')
  async addTag(@Param('postId') postId: number, @Param('tagId') tagId: number) {
    return await this.postTagsService.addTagToPost(postId, tagId);
  }

  // Post'tan Tag Silme
  @Delete(':postId/tags/:tagId')
  async removeTag(
    @Param('postId') postId: number,
    @Param('tagId') tagId: number,
  ) {
    return await this.postTagsService.deleteTagFromPost(postId, tagId);
  }
}
