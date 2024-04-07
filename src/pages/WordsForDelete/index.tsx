import { createContext, useEffect, useState } from 'react';
import { wordsForDeleteEvents, wordsForDeleteStores } from '../../shared/model/wordsForDelete';
import { useStore } from 'effector-react';
import { Button, notification } from 'antd';
import SvelteJsonEditor from './SvelteJsonEditor';

const Context = createContext({ name: 'Default' });

export const WordsForDeletePage = () => {
    const content = useStore(wordsForDeleteStores.content);
    const isContentUpdated = useStore(wordsForDeleteStores.isContentUpdated);
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
        wordsForDeleteEvents.updateWordsForDeleteFn(currentJson.json);
    };

    useEffect(() => {
        if (isContentUpdated) {
            openNotification('topRight');
            wordsForDeleteEvents.resetIsWordsUpdatedFn();
        }
    }, [isContentUpdated]);

    useEffect(() => {
        wordsForDeleteEvents.getWordsForDeleteFn();
        return () => wordsForDeleteEvents.resetWordsFn();
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
