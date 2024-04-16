import axios from './axios-instance';

export const getAvailableAccountMidjourney = () =>
    axios<NonNullable<unknown>>({
        url: '/getAvailableAccountMidjourney',
        method: 'POST',
        data: {}
    });

export const updateAvailableAccountMidjourney = (payload: any) =>
    axios<NonNullable<unknown>>({
        url: '/updateAvailableAccountMidjourney',
        method: 'POST',
        data: payload
    });

export const createAvailableAccountMidjourney = (payload: any) =>
    axios<NonNullable<unknown>>({
        url: '/createAvailableAccountMidjourney',
        method: 'POST',
        data: payload
    });
