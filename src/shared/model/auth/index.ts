import { createEffect, createEvent, createStore, sample } from 'effector';
import { API } from '../../api';

const loginFn = createEvent<{ login: string; password: string }>();
const setIsAuthFn = createEvent<boolean>();

const loginFx = createEffect(async (payload: { login: string; password: string }) => {
    const data = await API.auth.login(payload);
    if (data.token) {
        console.log('token', data.token);
        localStorage.setItem('token', data.token);
        return data;
    } else {
        throw new Error();
    }
});

const isAuth = createStore(true)
    .on(loginFx.doneData, () => true)
    .on(setIsAuthFn, (_, isAuth) => isAuth);

export const authStores = {
    isAuth
};

export const authEffects = {
    loginFx
};

export const authEvents = {
    loginFn,
    setIsAuthFn
};
