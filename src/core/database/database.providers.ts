import { Sequelize } from 'sequelize-typescript';


export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                database: 'tweets',
                dialect: 'postgres',
                username: 'postgres',
                password: '2829',
            });
            sequelize.addModels([__dirname + '/**/*.model.ts']);
            await sequelize.sync();
            return sequelize;
        },
    },
];
