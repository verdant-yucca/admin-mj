import { sample } from 'effector';
import { usersEvents, usersEffects } from './index';

sample({
    clock: usersEvents.getUsersFn,
    target: usersEffects.getUsersFx
});
