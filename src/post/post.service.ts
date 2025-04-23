import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreatePostDto } from './dto/create-post.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class PostService {
    constructor(
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
        private readonly prisma: PrismaService
    ) {}

    async createPost(dto: CreatePostDto) {
        const post = await this.prisma.$transaction(async (tx) => {
            const created = await tx.post.create({ data: dto });

            await tx.outboxEvent.create({
                data: {
                    type: 'post.created',
                    payload: created,
                },
            });

            return created;
        });

        return { success: true, post };
    }
}
