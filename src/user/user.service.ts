import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
const Op = require('sequelize').Op;

import { Follower, User } from './user.model';
import { UserDto } from './user.dto';
import { Tweet } from 'src/tweet/tweet.model';

@Injectable()
export class UserService {
    constructor(
        @Inject("USER_REPOSITORY") private readonly userRepository: typeof User,
        @Inject("FOLLOWER_REPOSITORY") private readonly followerRepository: typeof Follower
    ) { }

    async getUnFollowed(user_id) {
        return Follower.findAll({ where: { userId: user_id } })
            .then(records => records.map(record => record.followedId))
            .then((follower_ids: Number[]) => {
                follower_ids.push(user_id);
                return User.findAll({ where: { id: { [Op.notIn]: follower_ids } } });
            })
    }

    async showAll() {
        const users = await this.userRepository.findAll({});
        return users.map(user => user.toResponseObject(false));
    }

    async read(username: string) {
        const user = await this.userRepository.findOne({
            where: { username },
            include: [
                {
                    model: User,
                    as: 'followers',
                },
                {
                    model: Tweet,
                    as: 'tweets'
                }
            ]
        });
        return user
    }

    async findById(id: any) {
        const user = await this.userRepository.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    as: 'followers',
                },
                {
                    model: Tweet,
                    as: 'tweets'
                }
            ]
        });
        return user
    }

    async login(data: UserDto) {
        const { username, password } = data;
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user;
    }

    async register(data: UserDto) {
        const { username } = data;
        let user = await this.userRepository.findOne({ where: { username } });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        return user.toResponseObject();
    }

    async followUser(userId, followedId) {
        if (followedId == userId) {
            throw new HttpException(
                "you can't follow your self",
                HttpStatus.BAD_REQUEST,
            );
        }
        let following = await this.followerRepository.create({ userId, followedId });
        console.log(following);
        return JSON.stringify(following)
    }
}
