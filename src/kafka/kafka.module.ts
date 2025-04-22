import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'nestjs-kafka',
                        brokers: ['kafka:29092'],
                    },
                    consumer: {
                        groupId: 'nestjs-consumer-group',
                    },
                },
            },
        ]),
    ],
    exports: [ClientsModule], // ✅ 요것도 꼭 필요
})
export class KafkaModule {}
