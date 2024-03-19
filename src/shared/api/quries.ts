import axios from './axios-instance';

export const getQueries = () =>
    axios<NonNullable<unknown>>({
        url: '/getQueries',
        method: 'POST',
        data: { dateStart: '03.18.2024', dateEnd: '03.20.2024' }
    });
