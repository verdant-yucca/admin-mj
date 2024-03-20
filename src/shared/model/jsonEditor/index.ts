import { createEffect, createEvent, createStore } from 'effector';
import { API } from '../../api';

const getContentFn = createEvent();
const getContentFx = createEffect(async () => {
    const data = await API.jsonEditor.getContent();
    if (data) {
        return data;
    } else {
        throw new Error();
    }
});

const updateContentFn = createEvent<NonNullable<unknown>>();
const updateContentFx = createEffect(async (payload: NonNullable<unknown>) => {
    const data = await API.jsonEditor.updateContent(payload);
    if (data) {
        return data;
    } else {
        throw new Error();
    }
});
const resetContentFn = createEvent();
const content = createStore({})
    .on(getContentFx.doneData, (_, content) => content)
    .reset(resetContentFn);
const resetIsContentUpdatedFn = createEvent();
const isContentUpdated = createStore(false)
    .on(updateContentFx.doneData, () => true)
    .reset(resetIsContentUpdatedFn);

export const jsonEditorStores = {
    content,
    isContentUpdated
};

export const jsonEditorEffects = {
    getContentFx,
    updateContentFx
};

export const jsonEditorEvents = {
    getContentFn,
    updateContentFn,
    resetContentFn,
    resetIsContentUpdatedFn
};
