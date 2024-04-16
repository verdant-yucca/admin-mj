import { createEffect, createEvent, createStore, sample } from 'effector';
import { API } from '../../api';

const getPackagesFn = createEvent();
const setPackagesFn = createEvent<any>();
const savePackagesFn = createEvent<any>();

const getPackagesFx = createEffect(async () => {
    const { packages } = await API.packages.getPackages();
    if (packages) {
        return packages;
    } else {
        return [];
    }
});

const packages = createStore([])
    .on(getPackagesFx.doneData, (_, packages) => packages.map(data => ({ ...data, key: data._id })))
    .on(setPackagesFn, (_, data) => data);

const savePackagesFx = createEffect((packages: any) => {
    API.packages.savePackages(packages);
});

sample({
    clock: getPackagesFn,
    target: getPackagesFx
});

sample({
    clock: savePackagesFn,
    target: savePackagesFx
});

export const packagesStores = {
    packages
};

export const packagesEffects = {
    getPackagesFx,
    savePackagesFx
};

export const packagesEvents = {
    getPackagesFn,
    setPackagesFn,
    savePackagesFn
};
