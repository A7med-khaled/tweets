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
import { TweetService } from './tweet.service';
import { UserService } from 'src/user/user.service';

@Resolver()
export class TweetResolver {
    constructor(
        private tweetService: TweetService,
    ) { }

    @Query()
    @UseGuards(new AuthGuard())
    async tweets() {
        return await this.tweetService.showAll();
    }

    @Query()
    @UseGuards(new AuthGuard())
    async followingTweets(@Context('user') user) {
        const { id } = user;
        return await this.tweetService.getFollowingTweets(id);
    }

    @Mutation('tweet')
    @UseGuards(new AuthGuard())
    async createTweet(@Context('user') user, @Args('body') body: string) {
        console.log(user);
        const { id } = user;
        return await this.tweetService.create({ body, authorId: id });
    }

}
