import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, BeforeUpdate, HasMany } from 'sequelize-typescript';
import { UserRO } from './user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Tweet } from '../tweet/tweet.model';
import { Reply } from '../reply/reply.model';

import { from } from 'rxjs';
@Table
export class User extends Model<User> {

    @Column({ type: DataType.STRING, allowNull: false })
    username: string;

    @Column({ type: DataType.STRING, allowNull: false, })
    password: string;

    @CreatedAt
    created: Date;

    @UpdatedAt
    updated: Date;



    @HasMany(() => Tweet)
    tweets: Tweet[];

    @HasMany(() => Reply)
    replies: Reply[];

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(user: User) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }


    toResponseObject(showToken: boolean = true): UserRO {
        const { id, created, username, token } = this;
        const responseObject: UserRO = {
            id,
            created,
            username,
        };


        if (showToken) {
            responseObject.token = token;
        }
        return responseObject;
    }


    private get token(): string {
        const { id, username } = this;

        return jwt.sign(
            {
                id,
                username,
            },
            process.env.SECRET,
            { expiresIn: '7d' },
        );
    }
}
