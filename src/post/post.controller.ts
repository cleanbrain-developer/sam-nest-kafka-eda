import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @ApiBody({ type: CreatePostDto })
    create(@Body() dto: CreatePostDto) {
        return this.postService.createPost(dto);
    }
}
