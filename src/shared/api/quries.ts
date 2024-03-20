import axios from './axios-instance';

export const getQueries = (data: { dateStart: string; dateEnd: string }) =>
    axios<NonNullable<unknown>>({
        url: '/getQueries',
        method: 'POST',
        data
    });
