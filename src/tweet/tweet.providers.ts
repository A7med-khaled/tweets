import { Tweet } from "./tweet.model";

export const tweetsProviders = [
    {
        provide: 'TWEET_REPOSITORY',
        useValue: Tweet,
    },
];
