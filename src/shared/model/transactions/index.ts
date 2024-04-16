import { createEffect, createEvent, createStore, sample } from 'effector';
import { API } from '../../api';
import { secondsToTime } from '@/shared/utils/common';

interface Transaction {
    _id: string;
    prompt?: string;
    originPrompt?: string;
    midjourneyClientId?: string;
    discordMsgId?: string;
    flags?: string;
    buttons?: string;
    action?: string;
    stage: string;
    waitTime: number;
    leadTime: string;
    dateUpdate: string;
    dateQuery: string;
    key?: string;
}
const getTransactionsFn = createEvent();
const getTransactionsFx = createEffect(async (): Promise<Transaction[]> => {
    const data = await API.transactions.getTransactions();
    if (data) {
        return data?.transactions || [];
    } else {
        throw new Error();
    }
});

interface UpdateTransactionBodyParams {
    _id: string;
    prompt?: string;
    originPrompt?: string;
    midjourneyClientId?: string;
    discordMsgId?: string;
    flags?: string;
    buttons?: string;
    action?: string;
    stage: string;
}

const updateTransactionFn = createEvent<UpdateTransactionBodyParams>();
const updateTransactionFx = createEffect(async (payload: UpdateTransactionBodyParams) => {
    try {
        API.transactions.updateTransaction(payload);
    } catch (e) {
        console.log(e);
    }
});

const transactions = createStore<Transaction[]>([]).on(getTransactionsFx.doneData, (_, transactions) =>
    transactions.map(transaction => ({
        ...transaction,
        dateQuery: new Date(transaction.dateQuery).toLocaleDateString(),
        leadTime: secondsToTime(Number(((new Date() - new Date(transaction.dateQuery)) / 1000).toFixed(0))),
        key: transaction._id
    }))
);

sample({
    clock: getTransactionsFn,
    target: getTransactionsFx
});

sample({
    clock: updateTransactionFn,
    target: updateTransactionFx
});

export const transactionsStores = {
    transactions
};

export const transactionsEffects = {
    getTransactionsFx,
    updateTransactionFx
};

export const transactionsEvents = {
    getTransactionsFn,
    updateTransactionFn
};
