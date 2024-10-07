import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { CommentModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { PostTagsModule } from './post_tags/post_tags.module';
@Module({
  imports: [
    CommentModule,
    CategoriesModule,
    PostsModule,
    TagsModule,
    PostTagsModule,
  ],
})
export class AppModule {}
