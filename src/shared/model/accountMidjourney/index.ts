import { createEffect, createEvent, createStore, sample } from 'effector';
import { API } from '../../api';

interface Account {
    _id: string;
    name: string;
    customId: string;
    status: string;
    ServerId: string;
    ChannelId: string;
    DiscordToken: string;
    dateCreate: string;
}
const getAvailableAccountMidjourneyFn = createEvent();
const getAvailableAccountMidjourneyFx = createEffect(async (): Promise<Account[]> => {
    const data = await API.accountMidjourney.getAvailableAccountMidjourney();
    if (data) {
        return data?.accounts || [];
    } else {
        throw new Error();
    }
});

interface UpdateAccountBodyParams {
    _id: string;
    name: string;
    customId: string;
    status: string;
    ServerId: string;
    ChannelId: string;
    DiscordToken: string;
    dateCreate: string;
}

const updateAccountFn = createEvent<UpdateAccountBodyParams>();
const updateAccountFx = createEffect(async (payload: UpdateAccountBodyParams) => {
    try {
        API.accountMidjourney.updateAvailableAccountMidjourney({ ...payload, customId: payload.customId.toString() });
    } catch (e) {
        console.log(e);
    }
});

const createAccountMidjourneyFn = createEvent<any>();
const createAccountMidjourneyFx = createEffect(async (payload: any): Promise<Account> => {
    const data = await API.accountMidjourney.createAvailableAccountMidjourney(payload);
    if (data) {
        console.log('data', data);
        return data;
    } else {
        throw new Error();
    }
});

const accounts = createStore<Account[]>([])
    .on(getAvailableAccountMidjourneyFx.doneData, (_, accounts) =>
        accounts.map(account => ({
            ...account,
            dateCreate: new Date(account.dateCreate).toLocaleDateString(),
            key: account._id
        }))
    )
    .on(createAccountMidjourneyFx.doneData, (data, newData) => [...data, newData]);

sample({
    clock: getAvailableAccountMidjourneyFn,
    target: getAvailableAccountMidjourneyFx
});

sample({
    clock: updateAccountFn,
    target: updateAccountFx
});

sample({
    clock: createAccountMidjourneyFn,
    target: createAccountMidjourneyFx
});

export const accountsStores = {
    accounts
};

export const accountsEffects = {
    getAvailableAccountMidjourneyFx,
    updateAccountFx
};

export const accountsEvents = {
    getAvailableAccountMidjourneyFn,
    updateAccountFn,
    createAccountMidjourneyFn
};
