
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Reply {
    id?: string;
    body: string;
    created: string;
    author?: User;
}

export interface IQuery {
    reply(id: string): Reply | Promise<Reply>;
    tweets(): Tweet[] | Promise<Tweet[]>;
    followingTweets(): Tweet[] | Promise<Tweet[]>;
    users(): User[] | Promise<User[]>;
    user(username: string): User | Promise<User>;
    whoami(): User | Promise<User>;
    getNotFollowed(): User[] | Promise<User[]>;
    getFollowed(): User[] | Promise<User[]>;
}

export interface IMutation {
    createReply(tweet: string, body: string): Reply | Promise<Reply>;
    deleteReply(id: string): Reply | Promise<Reply>;
    tweet(body: string): Tweet | Promise<Tweet>;
    login(username: string, password: string): Auth | Promise<Auth>;
    register(username: string, password: string): Auth | Promise<Auth>;
    follow(followedId?: string): string | Promise<string>;
}

export interface Tweet {
    id: string;
    body: string;
    author: User;
    replies?: Reply[];
}

export interface User {
    id: string;
    username: string;
    followers?: Follower[];
    tweets?: Tweet[];
}

export interface Auth {
    username?: string;
    token?: string;
}

export interface Follower {
    id?: string;
    username?: string;
}
