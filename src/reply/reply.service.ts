
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Tweet } from 'src/tweet/tweet.model';
import { User } from 'src/user/user.model';
import { Reply } from './reply.model';


@Injectable()
export class ReplyService {
    constructor(@Inject("REPLY_REPOSITORY") private readonly replyRepository: typeof Reply) { }


    async getOne(id) {
        const reply = await this.replyRepository.findOne({ where: { id }, include: [User, Tweet] });
        console.log(reply);
        return reply;
    }


    async create(data: { body: string, authorId: number, tweetId: number }) {
        let reply = await this.replyRepository.create(data);
        // let tw = await this.tweetRepository.findOne({ where: { id: tweet.id }, include: [User] })
        return reply;
    }

}
