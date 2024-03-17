import { FC } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useStore } from 'effector-react';
import { APP_ROUTE } from '@/shared/constants/routes';
import { authStores } from '../../../shared/model/auth';

interface Props {
    component: JSX.Element;
}

export const PrivateRoute: FC<Props> = ({ component: Component }) => {
    const isAuth = useStore(authStores.isAuth);
    return <Route>{() => (isAuth ? <Component /> : <Navigate to={APP_ROUTE.login} />)}</Route>;
};
