
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Reply } from 'src/reply/reply.model';
import { Follower, User } from 'src/user/user.model';
import { Tweet } from './tweet.model';
const { Op } = require("sequelize");


@Injectable()
export class TweetService {
    constructor(@Inject("TWEET_REPOSITORY") private readonly tweetRepository: typeof Tweet) { }


    async showAll() {
        const tweets = await this.tweetRepository.findAll({
            include: [
                { model: User },
                { model: Reply, include: [User] }
            ]
        });
        return tweets;
    }


    async create(data: { body: string, authorId: number }) {
        let tweet = await this.tweetRepository.create(data);
        let tw = await this.tweetRepository.findOne({ where: { id: tweet.id }, include: [User] })
        return tw;
    }

    async getFollowingTweets(user_id) {
        return Follower.findAll({ where: { userId: user_id } })
            .then(records => records.map(record => record.followedId))
            .then((follower_ids: Number[]) => {
                return this.tweetRepository.findAll({
                    where: { authorId: { [Op.in]: follower_ids } },
                    include: [
                        { model: User },
                        { model: Reply, include: [User] }
                    ]
                });
            })
    }

}
