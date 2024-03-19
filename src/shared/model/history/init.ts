import { sample } from 'effector';
import { historyEvents, historyStores } from './index';
import { NavigateFunction } from 'react-router';

const { history } = historyStores;

//@ts-ignore
sample({
    clock: historyEvents.push,
    source: history,
    fn: (history: { navigate: NavigateFunction }, router: string) => {
        history.navigate(router);
    }
});
