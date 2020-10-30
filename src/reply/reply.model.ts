import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, BeforeUpdate, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Tweet } from 'src/tweet/tweet.model';
import { User } from 'src/user/user.model';


@Table
export class Reply extends Model<Reply> {

    @Column({ type: DataType.STRING, allowNull: false })
    body: string;

    @ForeignKey(() => User)
    @Column
    authorId: number;

    @BelongsTo(() => User)
    author: User;


    @ForeignKey(() => Tweet)
    @Column
    tweetId: number;

    @BelongsTo(() => Tweet)
    tweet: Tweet;



    @CreatedAt
    created: Date;

    @UpdatedAt
    updated: Date;


}
