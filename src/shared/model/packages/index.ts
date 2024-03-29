import { attach, createEffect, createEvent, createStore } from 'effector';
import { API } from '../../api';

const getPackagesFn = createEvent();
const setPackagesFn = createEvent<any>();
const savePackagesFn = createEvent();

const getPackagesFx = createEffect(async () => {
    const packages = await API.packages.getPackages();
    if (packages) {
        return packages;
    } else {
        return [];
    }
});

const packages = createStore([])
    .on(getPackagesFx.doneData, (_, packages) => packages.map(data => ({ ...data, key: data._id })))
    .on(setPackagesFn, (_, data) => data);

const savePackagesFx = attach({
    source: packages,
    effect: packages => {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            API.packages.savePackages(packages);
            if (count > 1) {
                clearInterval(interval);
            }
        }, 1000);
    }
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
