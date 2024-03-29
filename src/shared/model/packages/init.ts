import { sample } from 'effector';
import { packagesEffects, packagesEvents } from './index';

sample({
    clock: packagesEvents.getPackagesFn,
    target: packagesEffects.getPackagesFx
});

sample({
    clock: packagesEvents.savePackagesFn,
    target: packagesEffects.savePackagesFx
});
