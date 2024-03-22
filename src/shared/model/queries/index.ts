import { createEffect, createEvent, createStore } from 'effector';
import { API } from '../../api';

const getQueriesForTimeFn = createEvent<{ dateStart: string; dateEnd: string }>();

const getQueriesForTimeFx = createEffect(async (payload: { dateStart: string; dateEnd: string }) => {
    const data = await API.quries.getQueries(payload);
    if (data) {
        return data?.queries || [];
    } else {
        throw new Error();
    }
});

const getQueriesForCountFn = createEvent<{ dateStart: string; dateEnd: string }>();
const getQueriesForCountFx = createEffect(async (payload: { dateStart: string; dateEnd: string }) => {
    const data = await API.quries.getQueries(payload);
    if (data) {
        return data?.queries || [];
    } else {
        throw new Error();
    }
});

const queriesForTime = createStore([]).on(getQueriesForTimeFx.doneData, (_, queries) => {
    const regexV = /V[1-4]/;
    const regexU = /U[1-4]/;
    const regexReroll = /🔄/;

    return queries.map(query => ({
        ...query,
        leadTime: query.leadTime ? +(query.leadTime / 1000 / 60).toFixed(2) : 0,
        action: query.action
            ? regexV.test(query.action)
                ? 'Варианты'
                : regexU.test(query.action)
                  ? 'Результат'
                  : regexReroll.test(query.action)
                    ? 'Reroll'
                    : query.action
            : 'Незавершено'
    }));
});

const roundToMinute = (dateString: string) => {
    const date = new Date(dateString);
    date.setMilliseconds(0);
    date.setSeconds(0);
    return date.toLocaleString();
};

const queriesForCount = createStore([]).on(getQueriesForCountFx.doneData, (_, queries) => {
    const regexV = /V[1-4]/;
    const regexU = /U[1-4]/;
    const regexReroll = /🔄/;

    return queries.map(query => ({
        ...query,
        leadTime: query.leadTime ? +(query.leadTime / 1000 / 60).toFixed(2) : 0,
        action: query.action
            ? regexV.test(query.action)
                ? 'Варианты'
                : regexU.test(query.action)
                  ? 'Результат'
                  : regexReroll.test(query.action)
                    ? 'Reroll'
                    : query.action
            : 'Незавершено'
    }));
});

const queriesCountByMinute = queriesForCount.map(queries => {
    const groupedData = queries.reduce((acc, curr) => {
        const key = `${roundToMinute(curr.dateQuery)}_${curr.action}`; // Создаем уникальный ключ для каждой комбинации даты и действия
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
    return date.toLocaleString();
};

const queriesCountByHours = queriesForCount.map(queries => {
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
    return date.toLocaleString();
};

const queriesCountByDays = queriesForCount.map(queries => {
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
    queriesForTime,
    queriesCountByMinute,
    queriesCountByHours,
    queriesCountByDays
};

export const queriesEffects = {
    getQueriesForTimeFx,
    getQueriesForCountFx
};

export const queriesEvents = {
    getQueriesForTimeFn,
    getQueriesForCountFn
};
