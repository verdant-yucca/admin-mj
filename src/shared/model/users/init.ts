import { sample } from 'effector';
import { usersEvents, usersEffects } from './index';

sample({
    clock: usersEvents.getUsersFn,
    target: usersEffects.getUsersFx
});

sample({
    clock: usersEvents.updateUserFn,
    target: usersEffects.updateUserFx
});
