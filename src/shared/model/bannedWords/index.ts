import { createEffect, createEvent, createStore, sample } from 'effector';
import { API } from '../../api';

const getBannedWordsFn = createEvent();
const getBannedWordsFx = createEffect(async () => {
    const data = await API.bannedWords.getBannedWords();
    if (data) {
        return data;
    } else {
        throw new Error();
    }
});

const updateBannedWordsFn = createEvent<NonNullable<unknown>>();
const updateBannedWordsFx = createEffect(async (payload: NonNullable<unknown>) => {
    const data = await API.bannedWords.updateBannedWords(payload);
    if (data) {
        return data;
    } else {
        throw new Error();
    }
});
const resetWordsFn = createEvent();
const content = createStore({})
    .on(getBannedWordsFx.doneData, (_, content) => content)
    .reset(resetWordsFn);
const resetIsWordsUpdatedFn = createEvent();
const isContentUpdated = createStore(false)
    .on(updateBannedWordsFx.doneData, () => true)
    .reset(resetIsWordsUpdatedFn);

sample({
    clock: getBannedWordsFn,
    target: getBannedWordsFx
});

sample({
    clock: updateBannedWordsFn,
    target: updateBannedWordsFx
});

export const bannedWordsStores = {
    content,
    isContentUpdated
};

export const bannedWordsEffects = {
    getBannedWordsFx,
    updateBannedWordsFx
};

export const bannedWordsEvents = {
    getBannedWordsFn,
    updateBannedWordsFn,
    resetWordsFn,
    resetIsWordsUpdatedFn
};
