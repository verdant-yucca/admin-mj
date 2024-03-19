import { Event } from 'effector';
import { History } from 'history';

export type HistoryEvents = {
    [K in keyof History as History[K] extends (...args: any) => any ? K : never]: History[K] extends (
        ...args: any
    ) => any
        ? Event<Parameters<History[K]>>
        : never;
};
