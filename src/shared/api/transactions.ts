import axios from './axios-instance';

export const getTransactions = () =>
    axios<NonNullable<unknown>>({
        url: '/getTransactions',
        method: 'POST',
        data: {}
    });

export const updateTransaction = (payload: any) =>
    axios<NonNullable<unknown>>({
        url: '/updateTransaction',
        method: 'POST',
        data: payload
    });
