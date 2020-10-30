import {
    Resolver,
    Query,
    Args,
    ResolveProperty,
    Parent,
    Mutation,
    Context,
} from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/core/auth.gaurd';
import { UserService } from 'src/user/user.service';
import { ReplyService } from './reply.service';
import { Reply } from './reply.model';

@Resolver()
export class ReplayResolver {
    constructor(
        private replyService: ReplyService,
    ) { }

    @Query()
    @UseGuards(new AuthGuard())
    async reply(
        @Args('id') id: number,
    ) {
        return await this.replyService.getOne(id);
    }

    @Mutation()
    @UseGuards(new AuthGuard())
    async createReply(
        @Args('tweet') tweetId: number,
        @Args('body') body: string,
        @Context('user') user,
    ) {
        const { id: authorId } = user;
        return await this.replyService.create({ body, authorId, tweetId });
    }


  

}
