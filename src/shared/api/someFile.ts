// this wil be api logic
import axios from './axios-instance';

export const getSome = () =>
    axios<any[]>({
        url: '/some-request',
        method: 'GET'
    });
