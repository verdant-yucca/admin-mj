import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { useEffect } from 'react';
import { jsonEditorEvents, jsonEditorStores } from '../../shared/model/jsonEditor';
import { useStore } from 'effector-react';

export const JsonEditorPage = () => {
    const content = useStore(jsonEditorStores.content);

    useEffect(() => {
        jsonEditorEvents.getContentFn();
    }, []);
    return (
        <>
            <JSONInput
                id="a_unique_id"
                height={'calc(100vh - 60px)'}
                width={'100%'}
                placeholder={content}
                locale={locale}
            />
        </>
    );
};
