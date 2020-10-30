import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { usersProviders } from './users.providers';
import { UserResolver } from './user.resolver';

@Module({
    providers: [
        UserService,
        ...usersProviders,
        UserResolver
    ]
})
export class UserModule { }
