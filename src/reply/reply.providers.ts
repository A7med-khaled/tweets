import { Reply } from "./reply.model";

export const RepliesProviders = [
    {
        provide: 'REPLY_REPOSITORY',
        useValue: Reply,
    },
];
