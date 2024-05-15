import { createEffect } from 'effector';
import { API } from '../../api';

const restartBotFx = createEffect(async () => API.common.restartBot());

export const commonStores = {};

export const commonEffects = {
    restartBotFx
};

export const commonEvents = {};
