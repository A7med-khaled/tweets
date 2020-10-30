import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, BeforeUpdate, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Reply } from 'src/reply/reply.model';
import { User } from 'src/user/user.model';


@Table
export class Tweet extends Model<Tweet> {

    @Column({ type: DataType.STRING, allowNull: false })
    body: string;

    @ForeignKey(() => User)
    @Column
    authorId: number;
   
    @BelongsTo(() => User)
    author: User;


    @HasMany(() => Reply)
    replies: Reply[];

    @CreatedAt
    created: Date;

    @UpdatedAt
    updated: Date;

  
}
