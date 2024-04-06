import { createEffect, createEvent, createStore } from 'effector';
import { API } from '../../api';

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
        leadTime: `${((new Date() - new Date(transaction.dateQuery)) / 1000).toFixed(0)} секунд`,
        key: transaction._id
    }))
);

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
