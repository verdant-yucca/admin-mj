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
const content = createStore({}).on(getContentFx.doneData, (_, content) => content);

export const jsonEditorStores = {
    content
};

export const jsonEditorEffects = {
    getContentFx
};

export const jsonEditorEvents = {
    getContentFn
};
