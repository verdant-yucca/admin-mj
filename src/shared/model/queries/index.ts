import { createEffect, createEvent, createStore } from 'effector';
import { API } from '../../api';

const getQueriesFn = createEvent<{ dateStart: string; dateEnd: string }>();

const getQueriesFx = createEffect(async (payload: { dateStart: string; dateEnd: string }) => {
    const data = await API.quries.getQueries(payload);
    if (data) {
        return data?.queries || [];
    } else {
        throw new Error();
    }
});
const queries = createStore([]).on(getQueriesFx.doneData, (_, queries) => {
    const regexV = /V[1-4]/;
    const regexU = /U[1-4]/;
    const regexReroll = /🔄/;

    return queries.map(query => ({
        ...query,
        leadTime: query.leadTime ? +(query.leadTime / 1000 / 60).toFixed(2) : 0,
        action: query.action
            ? regexV.test(query.action)
                ? 'Variations'
                : regexU.test(query.action)
                  ? 'Upscale'
                  : regexReroll.test(query.action)
                    ? 'Reroll'
                    : query.action
            : 'unknown'
    }));
});

const roundToMinute = (dateString: string) => {
    const date = new Date(dateString);
    date.setMilliseconds(0);
    date.setSeconds(0);
    return date.toISOString();
};

const queriesCountByMinute = queries.map(queries => {
    const groupedData = queries.reduce((acc, curr) => {
        const roundedDate = roundToMinute(curr.dateQuery);
        const key = `${roundedDate}_${curr.action}`; // Создаем уникальный ключ для каждой комбинации даты и действия
        acc[key] = acc[key] || 0;
        acc[key]++;
        return acc;
    }, {});

    // Преобразуем данные в формат, понятный библиотеке Ant Design Charts
    const chartData = Object.entries(groupedData).map(([key, count]) => {
        const [date, action] = key.split('_'); // Разбиваем ключ на дату и действие
        return { date, action, count };
    });

    return chartData;
});

const roundToHours = (dateString: string) => {
    const date = new Date(dateString);
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    return date.toISOString();
};

const queriesCountByHours = queries.map(queries => {
    const groupedData = queries.reduce((acc, curr) => {
        const roundedDate = roundToHours(curr.dateQuery);
        const key = `${roundedDate}_${curr.action}`; // Создаем уникальный ключ для каждой комбинации даты и действия
        acc[key] = acc[key] || 0;
        acc[key]++;
        return acc;
    }, {});

    // Преобразуем данные в формат, понятный библиотеке Ant Design Charts
    const chartData = Object.entries(groupedData).map(([key, count]) => {
        const [date, action] = key.split('_'); // Разбиваем ключ на дату и действие
        return { date, action, count };
    });

    return chartData;
});

const roundToDay = (dateString: string) => {
    const date = new Date(dateString);
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date.toISOString();
};
const queriesCountByDays = queries.map(queries => {
    const groupedData = queries.reduce((acc, curr) => {
        const roundedDate = roundToDay(curr.dateQuery);
        const key = `${roundedDate}_${curr.action}`; // Создаем уникальный ключ для каждой комбинации даты и действия
        acc[key] = acc[key] || 0;
        acc[key]++;
        return acc;
    }, {});

    // Преобразуем данные в формат, понятный библиотеке Ant Design Charts
    const chartData = Object.entries(groupedData).map(([key, count]) => {
        const [date, action] = key.split('_'); // Разбиваем ключ на дату и действие
        return { date, action, count };
    });

    return chartData;
});

export const queriesStores = {
    queries,
    queriesCountByMinute,
    queriesCountByHours,
    queriesCountByDays
};

export const queriesEffects = {
    getQueriesFx
};

export const queriesEvents = {
    getQueriesFn
};
