import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/user.model';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '2829',
        database: 'tweets',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    }
  }
]
