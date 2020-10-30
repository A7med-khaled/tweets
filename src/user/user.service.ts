import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';

import { User } from './user.model';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(@Inject("USER_REPOSITORY") private readonly userRepository: typeof User) { }


    async showAll() {
        const users = await this.userRepository.findAll({});
        return users.map(user => user.toResponseObject(false));
    }

    async read(username: string) {
        const user = await this.userRepository.findOne({
            where: { username },
        });
        return user
    }

    async findById(id: any) {
        const user = await this.userRepository.findOne({
            where: { id },
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
}
