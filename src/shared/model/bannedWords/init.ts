import { sample } from 'effector';
import { bannedWordsEvents, bannedWordsEffects } from './index';

sample({
    clock: bannedWordsEvents.getBannedWordsFn,
    target: bannedWordsEffects.getBannedWordsFx
});

sample({
    clock: bannedWordsEvents.updateBannedWordsFn,
    target: bannedWordsEffects.updateBannedWordsFx
});
