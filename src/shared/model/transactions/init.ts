import { sample } from 'effector';
import { transactionsEvents, transactionsEffects } from './index';

sample({
    clock: transactionsEvents.getTransactionsFn,
    target: transactionsEffects.getTransactionsFx
});

sample({
    clock: transactionsEvents.updateTransactionFn,
    target: transactionsEffects.updateTransactionFx
});
