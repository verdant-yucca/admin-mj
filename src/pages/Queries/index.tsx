import { useEffect, useState } from 'react';
import { queriesEvents, queriesStores } from '../../shared/model/queries';
import { useStore } from 'effector-react';
import { Line } from '@ant-design/charts';
import { Collapse, DatePicker, Space } from 'antd';
import { Title } from './styles';
import { format } from 'date-fns';

export const QueriesPage = () => {
    const queries = useStore(queriesStores.queriesForTime);
    const queriesCountByMinute = useStore(queriesStores.queriesCountByMinute);
    const queriesCountByHours = useStore(queriesStores.queriesCountByHours);
    const queriesCountByDays = useStore(queriesStores.queriesCountByDays);

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        queriesEvents.getQueriesForCountFn({
            dateStart: format(date[0].$d, 'MM.dd.yyyy'),
            dateEnd: format(date[1].$d, 'MM.dd.yyyy')
        });
    };
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'ЗАПРОСЫ ПО ДНЯМ',
            children: (
                <Line
                    data={queriesCountByDays}
                    xField="date"
                    yField="count"
                    seriesField="action"
                    point={{
                        shapeField: 'square',
                        sizeField: 4
                    }}
                />
            )
        },
        {
            key: '2',
            label: 'ЗАПРОСЫ ПО ЧАСАМ',
            children: (
                <Line
                    data={queriesCountByHours}
                    xField="date"
                    yField="count"
                    seriesField="action"
                    point={{
                        shapeField: 'square',
                        sizeField: 4
                    }}
                />
            )
        },
        {
            key: '3',
            label: 'ЗАПРОСЫ ПО МИНУТАМ',
            children: (
                <Line
                    data={queriesCountByMinute}
                    xField={'date'}
                    yField="count"
                    seriesField="action"
                    point={{
                        shapeField: 'square',
                        sizeField: 4
                    }}
                />
            )
        }
    ];

    useEffect(() => {
        const currentDate = new Date();
        const tomorrow = new Date(currentDate).setDate(currentDate.getDate() + 1);
        const yesterday = new Date(currentDate).setDate(currentDate.getDate() - 1);

        queriesEvents.getQueriesForTimeFn({
            dateStart: format(yesterday, 'MM.dd.yyyy'),
            dateEnd: format(tomorrow, 'MM.dd.yyyy')
        });

        queriesEvents.getQueriesForCountFn({
            dateStart: format(yesterday, 'MM.dd.yyyy'),
            dateEnd: format(tomorrow, 'MM.dd.yyyy')
        });
    }, []);

    if (!queries?.length) return null;
    return (
        <>
            <div style={{ marginBottom: '30px' }}>
                <Title>График отображает время выполнения запросов</Title>
                <Line
                    data={queries}
                    xField="dateQuery"
                    yField="leadTime"
                    seriesField="action"
                    point={{
                        shapeField: 'square',
                        sizeField: 4
                    }}
                />
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    columnGap: '30px',
                    marginBottom: '30px',
                    height: '30px'
                }}
            >
                <Title>График отображает количество запросов</Title>
                <DatePicker.RangePicker onChange={onChange} format="DD/MM/YYYY" />
            </div>
            <Collapse items={items} accordion defaultActiveKey={['1']} />
        </>
    );
};
