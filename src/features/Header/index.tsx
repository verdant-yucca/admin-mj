import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { APP_ROUTE } from '../../shared/constants/routes';
import { historyEvents } from '../../shared/model/history';

export const Header = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key);
        historyEvents.push(e.key);
    };

    const items = [
        {
            label: 'Главная',
            key: APP_ROUTE.root
        },
        {
            label: 'Пользователи',
            key: APP_ROUTE.users
        },
        {
            label: 'Запросы',
            key: APP_ROUTE.queries
        },
        {
            label: 'Константы',
            key: APP_ROUTE.jsonEditor
        },
        {
            label: 'Пакеты',
            key: APP_ROUTE.packagePrice
        },
        {
            label: 'Очереди',
            key: APP_ROUTE.transactions
        },
        {
            label: 'Платежи',
            key: APP_ROUTE.payments
        }
    ];

    return (
        <>
            <Menu
                style={{ backgroundColor: '#bac4d8' }}
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
            />
        </>
    );
};
