import { Sequelize } from 'sequelize-typescript';
import { Reply } from 'src/reply/reply.model';
import { Tweet } from 'src/tweet/tweet.model';
import { Follower, User } from 'src/user/user.model';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const config: any = {
        dialect: process.env.DATABASE_DIALECT,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Tweet, Reply, Follower]);
      await sequelize.sync();
      return sequelize;
    }
  }
]
