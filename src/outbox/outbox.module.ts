import { Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module';
import {PrismaModule} from "../prisma/prisma.module";
import {OutboxWorkerService} from "./outbox.service";

@Module({
  imports: [KafkaModule, PrismaModule],
  providers: [OutboxWorkerService],
})
export class OutboxModule {}
