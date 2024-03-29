import axios from './axios-instance';

export const getPackages = () =>
    axios<NonNullable<unknown>>({
        url: '/getPackages',
        method: 'POST',
        data: {}
    });

export const savePackages = (data: any) =>
    axios<NonNullable<unknown>>({
        url: '/updatePackages',
        method: 'POST',
        data: { packages: data }
    });
