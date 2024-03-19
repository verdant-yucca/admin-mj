// this wil be api logic
import axios from './axios-instance';

export const getContent = () =>
    axios<NonNullable<unknown>>({
        url: '/getContent',
        method: 'POST',
        data: {}
    });

export const updateContent = (data: NonNullable<unknown>) =>
    axios<NonNullable<unknown>>({
        url: '/updateContent',
        method: 'POST',
        data
    });
