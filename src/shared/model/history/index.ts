import { createEvent, restore } from 'effector';
import { createGate } from 'effector-react';
import { NavigateFunction } from 'react-router';

export const HistoryGate = createGate<{ navigate: NavigateFunction }>();
const history = restore(HistoryGate.state.updates, null);

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

export const historyStores = {
    history
};
