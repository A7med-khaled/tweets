import { Module } from '@nestjs/common';
import { RepliesProviders } from './reply.providers';
import { ReplayResolver } from './reply.resolver';
import { ReplyService } from './reply.service';

@Module({
    providers: [
        ...RepliesProviders,
        ReplyService,
        ReplayResolver
    ],
})
export class ReplyModule { }
