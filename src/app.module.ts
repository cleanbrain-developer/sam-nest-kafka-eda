import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [KafkaModule, PostModule],
})
export class AppModule {}
