import { DependencyList, useEffect, useLayoutEffect, useState } from 'react';

export const useBlink = (deps: DependencyList) => {
    const [blink, setBlink] = useState(false);

    useLayoutEffect(() => {
        setBlink(true);
    }, deps);

    useEffect(() => {
        if (blink) {
            setTimeout(() => {
                setBlink(false);
            });
        }
    }, [blink]);

    return blink;
};
