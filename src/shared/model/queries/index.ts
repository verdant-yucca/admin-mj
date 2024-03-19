import { createEffect, createEvent, createStore } from 'effector';
import { API } from '../../api';

const getQueriesFn = createEvent();

const getQueriesFx = createEffect(async () => {
    const data = await API.quries.getQueries();
    if (data) {
        return data;
    } else {
        throw new Error();
    }
});
const queries = createStore({}).on(getQueriesFx.doneData, (_, Queries) => Queries.queries);

export const queriesStores = {
    queries
};

export const queriesEffects = {
    getQueriesFx
};

export const queriesEvents = {
    getQueriesFn
};
