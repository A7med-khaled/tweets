
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { User } from 'src/user/user.model';
import { Tweet } from './tweet.model';


@Injectable()
export class TweetService {
    constructor(@Inject("TWEET_REPOSITORY") private readonly tweetRepository: typeof Tweet) { }


    async showAll() {
        const tweets = await this.tweetRepository.findAll({ include: [User] });
        return tweets;
    }


    async create(data: { body: string, authorId: number }) {
        let tweet = await this.tweetRepository.create(data);
        let tw = await this.tweetRepository.findOne({ where: { id: tweet.id }, include: [User] })
        return tw;
    }

}
