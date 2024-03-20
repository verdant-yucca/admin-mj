import { createContext, useEffect, useState } from 'react';
import { jsonEditorEvents, jsonEditorStores } from '../../shared/model/jsonEditor';
import { useStore } from 'effector-react';
import { Button, notification } from 'antd';
import SvelteJsonEditor from './SvelteJsonEditor';

const Context = createContext({ name: 'Default' });

export const JsonEditorPage = () => {
    const content = useStore(jsonEditorStores.content);
    const isContentUpdated = useStore(jsonEditorStores.isContentUpdated);
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
        jsonEditorEvents.updateContentFn(currentJson.json);
    };

    useEffect(() => {
        if (isContentUpdated) {
            openNotification('topRight');
            jsonEditorEvents.resetIsContentUpdatedFn();
        }
    }, [isContentUpdated]);

    useEffect(() => {
        jsonEditorEvents.getContentFn();
        return () => jsonEditorEvents.resetContentFn();
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
