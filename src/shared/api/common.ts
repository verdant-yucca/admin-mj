import axios from './axios-instance-bot';

export const restartBot = () =>
    axios<NonNullable<unknown>>({
        url: '/restartTelegramBot',
        method: 'GET'
    });
