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
            key: APP_ROUTE.root,
            style: { height: '24px', lineHeight: '24px' }
        },
        {
            label: 'Статистика',
            key: 'Статистика',
            style: { height: '24px', lineHeight: '24px' },
            children: [
                {
                    label: 'Пользователи',
                    key: APP_ROUTE.users
                },
                {
                    label: 'Запросы',
                    key: APP_ROUTE.queries
                },
                {
                    label: 'Платежи',
                    key: APP_ROUTE.payments
                }
            ]
        },
        {
            label: 'Константы',
            key: APP_ROUTE.jsonEditor,
            style: { height: '24px', lineHeight: '24px' },
            children: [
                {
                    label: 'Контент (текста)',
                    key: APP_ROUTE.jsonEditor
                },
                {
                    label: 'Слова для удаления',
                    key: APP_ROUTE.wordsForDelete
                },
                {
                    label: 'Плохие слова',
                    key: APP_ROUTE.bannedWords
                },
                {
                    label: 'Пакеты',
                    key: APP_ROUTE.packagePrice
                }
            ]
        },
        {
            label: 'Очереди',
            key: APP_ROUTE.transactions,
            style: { height: '24px', lineHeight: '24px' }
        }
    ];

    return (
        <>
            <Menu
                style={{ backgroundColor: '#bac4d8', height: '30px', display: 'flex', alignItems: 'center' }}
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
            />
        </>
    );
};
