import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {ClientKafka} from "@nestjs/microservices";

@Injectable()
export class OutboxWorkerService implements OnModuleInit {
    constructor(
        private readonly prisma: PrismaService,
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    ) {}

    async onModuleInit() {
        setInterval(() => this.processOutbox(), 3000); // 3초마다 실행
    }

    private async processOutbox() {
        const events = await this.prisma.outboxEvent.findMany({
            where: { sent: false },
            take: 10,
        });

        for (const event of events) {
            try {
                await this.kafkaClient.emit(event.type, event.payload).toPromise();

                await this.prisma.outboxEvent.update({
                    where: { id: event.id },
                    data: { sent: true },
                });

                console.log(`✅ Outbox 이벤트 발행 완료: ${event.id}`);
            } catch (err) {
                console.error(`❌ Kafka 발행 실패: ${event.id}`, err.message);
            }
        }
    }
}
