import axios from './axios-instance';

export const getUsers = (data: { page: string; pageSize: string }) =>
    axios<NonNullable<unknown>>({
        url: '/getUsers',
        method: 'POST',
        data
    });

export const updateUser = (payload: any) =>
    axios<NonNullable<unknown>>({
        url: '/signin',
        method: 'POST',
        data: payload
    });
