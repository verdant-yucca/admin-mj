// this wil be api logic
import axios from './axios-instance';

export const getWordsForDelete = () =>
    axios<NonNullable<unknown>>({
        url: '/getWordsForDelete',
        method: 'POST',
        data: {}
    });

export const updateWordsForDelete = (data: NonNullable<unknown>) =>
    axios<NonNullable<unknown>>({
        url: '/updateWordsForDelete',
        method: 'POST',
        data
    });
