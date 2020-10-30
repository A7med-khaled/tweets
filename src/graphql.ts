
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
    users(): User[] | Promise<User[]>;
    user(username: string): User | Promise<User>;
    whoami(): User | Promise<User>;
}

export interface IMutation {
    createReply(tweet: string, body: string): Reply | Promise<Reply>;
    deleteReply(id: string): Reply | Promise<Reply>;
    tweet(body: string): Tweet | Promise<Tweet>;
    login(username: string, password: string): Auth | Promise<Auth>;
    register(username: string, password: string): Auth | Promise<Auth>;
}

export interface Tweet {
    id: string;
    body: string;
    author?: User;
}

export interface User {
    id: string;
    username: string;
}

export interface Auth {
    username: string;
    token: string;
}
