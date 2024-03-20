import { useEffect, useRef } from 'react';
import { JSONEditor } from 'vanilla-jsoneditor';

export default function SvelteJsonEditor(props) {
    const refContainer = useRef(null);
    const refEditor = useRef(null);
    console.log(props);

    useEffect(() => {
        //@ts-ignore
        refEditor.current = new JSONEditor({
            target: refContainer.current,
            props: {}
        });

        return () => {
            // destroy editor
            if (refEditor.current) {
                refEditor.current.destroy();
                refEditor.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (refEditor.current) {
            console.log('update props', props);
            refEditor.current.updateProps(props);
        }
    }, [props]);

    return <div style={{ height: 'calc(100vh - 100px)', width: '100%' }} ref={refContainer}></div>;
}
