import { createEffect, createEvent, createStore, sample } from 'effector';
import { API } from '../../api';

const getUsersFn = createEvent<{ page: string; pageSize: string }>();

const getUsersFx = createEffect(async (payload: { page: string; pageSize: string }) => {
    const data = await API.users.getUsers(payload);
    if (data) {
        return data?.users || [];
    } else {
        throw new Error();
    }
});

const updateUserFn = createEvent<any>();
const updateUserFx = createEffect(async (payload: any) => {
    try {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            API.users.updateUser(payload);
            if (count > 1) {
                clearInterval(interval);
            }
        }, 1000);
    } catch (e) {
        console.log(e);
    }
});
//@ts-ignore
const users = createStore([]).on(getUsersFx.doneData, (_, users) => users.map(user => ({ ...user, key: user._id })));

const roundToDay = (dateString: string) => {
    const date = new Date(dateString);
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date.toLocaleDateString();
};

const usersCountByDays = users.map(users => {
    const groupedData = users.reduce((acc, curr) => {
        const roundedDate = roundToDay(curr.createDate);
        acc[roundedDate] = acc[roundedDate] || 0;
        acc[roundedDate]++;
        return acc;
    }, {});

    // Преобразуем данные в формат, понятный библиотеке Ant Design Charts
    const chartData = Object.entries(groupedData).map(([key, count]) => {
        return { date: key, count };
    });

    return chartData;
});

sample({
    clock: getUsersFn,
    target: getUsersFx
});

sample({
    clock: updateUserFn,
    target: updateUserFx
});

export const usersStores = {
    usersCountByDays,
    users
};

export const usersEffects = {
    getUsersFx,
    updateUserFx
};

export const usersEvents = {
    getUsersFn,
    updateUserFn
};
