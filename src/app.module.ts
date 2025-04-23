import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { PostModule } from './post/post.module';
import {OutboxModule} from "./outbox/outbox.module";

@Module({
  imports: [KafkaModule, PostModule, OutboxModule],
})
export class AppModule {}
