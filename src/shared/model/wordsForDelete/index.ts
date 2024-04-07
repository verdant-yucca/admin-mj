import { createEffect, createEvent, createStore } from 'effector';
import { API } from '../../api';
import { getWordsForDelete } from '@/shared/api/wordsForDelete';

const getWordsForDeleteFn = createEvent();
const getWordsForDeleteFx = createEffect(async () => {
    const data = await API.wordsForDelete.getWordsForDelete();
    if (data) {
        return data;
    } else {
        throw new Error();
    }
});

const updateWordsForDeleteFn = createEvent<NonNullable<unknown>>();
const updateWordsForDeleteFx = createEffect(async (payload: NonNullable<unknown>) => {
    const data = await API.wordsForDelete.updateWordsForDelete(payload);
    if (data) {
        return data;
    } else {
        throw new Error();
    }
});
const resetWordsFn = createEvent();
const content = createStore({})
    .on(getWordsForDeleteFx.doneData, (_, content) => content)
    .reset(resetWordsFn);
const resetIsWordsUpdatedFn = createEvent();
const isContentUpdated = createStore(false)
    .on(updateWordsForDeleteFx.doneData, () => true)
    .reset(resetIsWordsUpdatedFn);

export const wordsForDeleteStores = {
    content,
    isContentUpdated
};

export const wordsForDeleteEffects = {
    getWordsForDeleteFx,
    updateWordsForDeleteFx
};

export const wordsForDeleteEvents = {
    getWordsForDeleteFn,
    updateWordsForDeleteFn,
    resetWordsFn,
    resetIsWordsUpdatedFn
};
