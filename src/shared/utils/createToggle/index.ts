import { Store, Event, createEvent, createStore, Domain } from 'effector';

type Param = boolean;
type Result = [Store<boolean>, ToggleEvent];

type ToggleEvent = Event<boolean | unknown> & ((this: any) => any); // without this hack TS throws errors (dunno why)

interface DataParam {
    domain?: Domain;
}

export const createToggle = (initialState: Param, data?: DataParam): Result => {
    const store = data?.domain ? data.domain.createStore(initialState) : createStore(initialState);
    const toggle = data?.domain ? data.domain.createEvent<boolean | unknown>() : createEvent<boolean | unknown>();

    store.on(toggle, (state, payload) => {
        if (typeof payload === 'boolean') {
            return payload;
        } else {
            return !state;
        }
    });

    return [store, toggle];
};
