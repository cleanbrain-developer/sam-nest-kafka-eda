import {Controller, Inject} from '@nestjs/common';
import {ClientKafka, MessagePattern, Payload} from '@nestjs/microservices';

@Controller()
export class PostConsumer {
    constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,) {
    }
    @MessagePattern('post.created')
    handlePostCreated(@Payload() data: any) {
        try {
            console.log('📥 게시글 생성 이벤트 수신:', data);

            if (data.title.includes('에러')) {
                throw new Error('❌ 에러 발생 테스트용');
            }

            console.log('✅ 정상 처리됨');
        } catch (err) {
            console.error('🚨 처리 실패, DLQ 전송:', err.message);

            // DLQ 전송 로직 (간단히 직접 emit)
            this.kafkaClient.emit('post.created.dlq', {
                original: data,
                error: err.message,
                failedAt: new Date().toISOString(),
            });
        }
    }

    // DLQ 토픽 수동 구성
    /*
        docker exec -it kafka \
        kafka-topics --bootstrap-server localhost:9092 --create --topic post.created.dlq --partitions 1 --replication-factor 1
    */
    @MessagePattern('post.created.dlq')
    handlePostDlq(@Payload() data: any) {
        console.warn('📦 DLQ 메시지 수신됨:', data);
    }
}
