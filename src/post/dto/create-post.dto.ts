import { IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({
        default: '',
    })
    @IsString()
    title: string;

    @ApiProperty({
        default: '',
    })
    @IsString()
    content: string;
}
