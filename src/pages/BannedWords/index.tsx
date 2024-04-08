import { createContext, useEffect, useState } from 'react';
import { bannedWordsEvents, bannedWordsStores } from '../../shared/model/bannedWords';
import { useStore } from 'effector-react';
import { Button, notification } from 'antd';
import SvelteJsonEditor from './SvelteJsonEditor';

const Context = createContext({ name: 'Default' });

export const BannedWordsPage = () => {
    const content = useStore(bannedWordsStores.content);
    const isContentUpdated = useStore(bannedWordsStores.isContentUpdated);
    const [currentJson, setCurrentJson] = useState({
        json: content
    });

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: `Успешно!`,
            description: <Context.Consumer>{() => `Ты пидор!`}</Context.Consumer>,
            placement
        });
    };

    const handleClick = () => {
        bannedWordsEvents.updateBannedWordsFn(currentJson.json);
    };

    useEffect(() => {
        if (isContentUpdated) {
            openNotification('topRight');
            bannedWordsEvents.resetIsWordsUpdatedFn();
        }
    }, [isContentUpdated]);

    useEffect(() => {
        bannedWordsEvents.getBannedWordsFn();
        return () => bannedWordsEvents.resetWordsFn();
    }, []);

    useEffect(() => {
        setCurrentJson({ json: content });
    }, [content]);

    return (
        <Context.Provider>
            {contextHolder}
            <SvelteJsonEditor content={currentJson} onChange={setCurrentJson} />
            <Button style={{ width: '100%', height: '54px' }} type={'primary'} onClick={handleClick}>
                SAVE
            </Button>
        </Context.Provider>
    );
};
