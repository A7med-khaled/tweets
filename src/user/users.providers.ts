import { Follower, User } from './user.model';

export const usersProviders = [
    {
        provide: 'USER_REPOSITORY',
        useValue: User,
    },
    {
        provide: 'FOLLOWER_REPOSITORY',
        useValue: Follower,
    },
];
