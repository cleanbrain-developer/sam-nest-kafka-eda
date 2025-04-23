import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostConsumer } from './post.consumer';
import { KafkaModule } from '../kafka/kafka.module';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports: [KafkaModule, PrismaModule],
  controllers: [PostController, PostConsumer],
  providers: [PostService],
})
export class PostModule {}
