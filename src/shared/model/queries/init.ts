import { sample } from 'effector';
import { queriesEffects, queriesEvents } from './index';

sample({
    clock: queriesEvents.getQueriesForTimeFn,
    target: queriesEffects.getQueriesForTimeFx
});

sample({
    clock: queriesEvents.getQueriesForCountFn,
    target: queriesEffects.getQueriesForCountFx
});
