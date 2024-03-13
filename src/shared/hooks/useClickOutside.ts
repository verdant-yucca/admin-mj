import { MutableRefObject, useEffect, useState } from 'react';

export const useClickOutside = (ref: MutableRefObject<HTMLElement | null>, callback: () => void) => {
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    useEffect(() => {
        const handleClick = (e: Event) => {
            if (ref.current && !ref.current.contains(e.target as Element)) {
                callback();
            }
        };
        if (!isFirstRender) {
            document.addEventListener('click', handleClick);
        }

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [isFirstRender, callback, ref]);
};
