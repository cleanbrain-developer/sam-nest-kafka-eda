import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PostConsumer {
    @MessagePattern('post.created')
    handlePostCreated(@Payload() data: any) {
        console.log('📥 게시글 생성 이벤트 수신:', data);
    }
}
