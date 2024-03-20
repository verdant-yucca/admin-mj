import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { useEffect, useState } from 'react';
import { jsonEditorEvents, jsonEditorStores } from '../../shared/model/jsonEditor';
import { useStore } from 'effector-react';
import { Button } from 'antd';

export const JsonEditorPage = () => {
    const content = useStore(jsonEditorStores.content);
    const [currentJson, setCurrentJson] = useState(content);
    const [buttonText, setButtonText] = useState('SAVE');
    const [countClick, setCountClick] = useState(0);
    console.log(currentJson);
    const handleClick = () => {
        if (countClick > 1) {
            // jsonEditorEvents.updateContentFn(currentJson);
            setButtonText('SAVE');
        }
        if (countClick === 1) {
            setButtonText('Ты хорошо подумал? Если да, нажимай ещё раз!');
        }
    };

    useEffect(() => {
        jsonEditorEvents.getContentFn();
    }, []);

    return (
        <>
            <JSONInput
                id="a_unique_id"
                height={'calc(100vh - 100px)'}
                width={'100%'}
                placeholder={content}
                onBlur={obj => {
                    console.log(obj);
                    // setCurrentJson(JSON.parse(obj.json));
                    setCountClick(1);
                }}
                locale={locale}
            />
            <Button style={{ width: '100%', height: '54px' }} type={'primary'} onClick={handleClick}>
                {buttonText}
            </Button>
        </>
    );
};
