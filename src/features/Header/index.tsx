import React, { createContext, useState } from 'react';
import type { MenuProps } from 'antd';
import { FloatButton, Menu, notification } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import { APP_ROUTE } from '../../shared/constants/routes';
import { historyEvents } from '../../shared/model/history';
import { StyledFloatButton } from '@/features/Header/styles';
import { commonEffects } from '@/shared/model/common';

const Context = createContext({ name: 'Default' });

export const Header = () => {
    const [current, setCurrent] = useState('mail');
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: `Успешно!`,
            description: <Context.Consumer>{() => `Ты пидор!`}</Context.Consumer>,
            placement
        });
    };

    const openNotificationError = (placement: NotificationPlacement) => {
        api.info({
            message: `Непорядок!`,
            description: <Context.Consumer>{() => `Хуиту вижу!`}</Context.Consumer>,
            placement
        });
    };
    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key);
        historyEvents.push(e.key);
    };

    const handleRestartClick = async () => {
        try {
            //@ts-ignore
            const response = await commonEffects.restartBotFx();
            if (response.result) {
                openNotification('topRight');
            } else {
                openNotificationError('topRight');
            }
        } catch (e) {
            openNotificationError('topRight');
        }
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
                },
                {
                    label: 'Аккаунты миджорни',
                    key: APP_ROUTE.accountMidjourney
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
        <Context.Provider>
            {contextHolder}
            <div style={{ position: 'relative' }}>
                <Menu
                    style={{ backgroundColor: '#bac4d8', height: '30px', display: 'flex', alignItems: 'center' }}
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                />
                <StyledFloatButton
                    icon={<RedoOutlined width={10} height={1} />}
                    type="default"
                    onClick={handleRestartClick}
                />
            </div>
        </Context.Provider>
    );
};
