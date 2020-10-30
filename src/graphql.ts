
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface User {
    id: string;
    username: string;
}

export interface Auth {
    username: string;
    token: string;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
    user(username: string): User | Promise<User>;
    whoami(): User | Promise<User>;
}

export interface IMutation {
    login(username: string, password: string): Auth | Promise<Auth>;
    register(username: string, password: string): Auth | Promise<Auth>;
}
