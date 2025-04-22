import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    ) {}

    async createPost(dto: CreatePostDto) {
        // 실제 DB 저장 생략
        await this.kafkaClient.emit('post.created', {
            title: dto.title,
            content: dto.content,
        });

        return { success: true };
    }
}
