import { sample } from 'effector';
import { wordsForDeleteEvents, wordsForDeleteEffects } from './index';

sample({
    clock: wordsForDeleteEvents.getWordsForDeleteFn,
    target: wordsForDeleteEffects.getWordsForDeleteFx
});

sample({
    clock: wordsForDeleteEvents.updateWordsForDeleteFn,
    target: wordsForDeleteEffects.updateWordsForDeleteFx
});
