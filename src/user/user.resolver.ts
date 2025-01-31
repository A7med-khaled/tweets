import {
  Resolver,
  Query,
  Args,
  Mutation,
  Context,
} from '@nestjs/graphql';


import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/core/auth.gaurd';
import { User } from './user.model';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) { }

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

  @Query()
  @UseGuards(new AuthGuard())
  async getNotFollowed(@Context('user') user) {
    const { id } = user;
    return await this.userService.getUnFollowed(id);
  }

  @Query()
  @UseGuards(new AuthGuard())
  async getFollowed(@Context('user') user) {
    const { id } = user;
    return await this.userService.getFollowed(id);
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

  @Mutation()
  @UseGuards(new AuthGuard())
  async follow(
    @Context('user') user,
    @Args('followedId') followedId: string,
  ) {
    return await this.userService.followUser(user.id, followedId);
  }

}
