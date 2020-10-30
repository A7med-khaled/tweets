import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';


import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/core/auth.gaurd';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
  ) { }

  @Query()
  @UseGuards(new AuthGuard())
  async users() {
    return await this.userService.showAll();
  }

  @Query()
  @UseGuards(new AuthGuard())
  async whoami(@Context('user') user) {
    const { username } = user;
    return await this.userService.read(username);
  }

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user: UserDto = { username, password };
    return await this.userService.login(user);
  }

  @Mutation()
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user: UserDto = { username, password };
    return await this.userService.register(user);
  }

}
