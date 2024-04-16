import { createEvent, restore, sample } from 'effector';
import { createGate } from 'effector-react';
import { NavigateFunction } from 'react-router';

export const HistoryGate = createGate<{ navigate: NavigateFunction }>();
const history = restore(HistoryGate.state.updates, {});

export const historyEvents = {
    push: createEvent<string>(),
    replace: createEvent(),
    go: createEvent(),
    goBack: createEvent(),
    goForward: createEvent(),
    block: createEvent(),
    listen: createEvent(),
    createHref: createEvent()
};

//@ts-ignore
sample({
    clock: historyEvents.push,
    source: history,
    fn: (history: { navigate: NavigateFunction }, router: string) => {
        history.navigate(router);
    }
});

export const historyStores = {
    history
};
