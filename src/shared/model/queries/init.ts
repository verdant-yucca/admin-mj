import { sample } from 'effector';
import { queriesEffects, queriesEvents } from './index';

sample({
    clock: queriesEvents.getQueriesFn,
    target: queriesEffects.getQueriesFx
});
