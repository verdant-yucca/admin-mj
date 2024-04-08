// this wil be api logic
import axios from './axios-instance';

export const getBannedWords = () =>
    axios<NonNullable<unknown>>({
        url: '/getBannedWords',
        method: 'POST',
        data: {}
    });

export const updateBannedWords = (data: NonNullable<unknown>) =>
    axios<NonNullable<unknown>>({
        url: '/updateBannedWords',
        method: 'POST',
        data
    });
