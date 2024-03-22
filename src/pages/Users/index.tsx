import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { Line } from '@ant-design/charts';
import { usersEvents, usersStores } from '../../shared/model/users';
import { Title } from './styles';

export const UsersPage = () => {
    const usersCountByDays = useStore(usersStores.usersCountByDays);

    useEffect(() => {
        usersEvents.getUsersFn({
            page: '1',
            pageSize: '3000'
        });
    }, []);

    if (!usersCountByDays?.length) return null;
    return (
        <>
            <Title>График отображает оличество новых пользователей в день</Title>
            <Line
                data={usersCountByDays}
                xField="date"
                yField="count"
                point={{
                    shapeField: 'square',
                    sizeField: 4
                }}
            />
        </>
    );
};
