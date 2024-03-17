// this wil be api logic
import axios from './axios-instance';

export const login = data =>
    axios<{ token: string }>({
        url: '/adminUserLogin',
        method: 'POST',
        data
    });
