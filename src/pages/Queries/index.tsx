import { useEffect, useState } from 'react';
import { queriesEvents, queriesStores } from '../../shared/model/queries';
import { useStore } from 'effector-react';
import { Line } from '@ant-design/charts';

export const QueriesPage = () => {
    const queries = useStore(queriesStores.queries);
    useEffect(() => {
        queriesEvents.getQueriesFn();
    }, []);

    const config = {
        data: queries,
        xField: 'dateQuery',
        yField: 'leadTime',
        point: {
            shapeField: 'square',
            sizeField: 4
        }
    };

    console.log(queries);
    if (!queries) return null;
    return <Line {...config} />;
};
