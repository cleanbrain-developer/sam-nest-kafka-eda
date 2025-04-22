import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { KafkaModule } from '../kafka/kafka.module'; // ← 여기 추가

@Module({
  imports: [KafkaModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
