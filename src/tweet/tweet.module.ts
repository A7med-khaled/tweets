import { Module } from '@nestjs/common';
import { tweetsProviders } from './tweet.providers'
import { TweetService } from './tweet.service';
import { TweetResolver } from './tweet.resolver';
import { UserService } from 'src/user/user.service';

@Module({
    providers: [
        ...tweetsProviders,
        TweetService,
        TweetResolver,
    ]
})
export class TweetModule { }
