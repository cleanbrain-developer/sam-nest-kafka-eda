import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostConsumer } from './post.consumer';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [PostController, PostConsumer],
  providers: [PostService],
})
export class PostModule {}
