import { sample } from 'effector';
import { jsonEditorEvents, jsonEditorEffects } from './index';

sample({
    clock: jsonEditorEvents.getContentFn,
    target: jsonEditorEffects.getContentFx
});
