import { Navigate, Outlet } from 'react-router-dom';
import { APP_ROUTE } from '@/shared/constants/routes';

export const PrivateMiddleware = () => {
    const isAuth = false;

    return isAuth ? <Outlet /> : <Navigate replace to={APP_ROUTE.login} />;
};
