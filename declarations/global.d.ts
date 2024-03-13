import { PropsWithChildren, ReactElement } from 'react';

declare module 'react' {
    interface FunctionComponent<P = NonNullable<unknown>> {
        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    }
}
