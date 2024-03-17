import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/application/styles/global';
import theme from '@/application/styles/theme';
import { APP_ROUTE } from '@/shared/constants/routes';
import { MainLayout } from '@/features/MainLayout';
import { LoginPage } from '@/pages/Login';
import { MainPage } from '@/pages/Main';
import { PrivateRoute } from './features/middlewares/PrivateMiddleware';
import { useStore } from 'effector-react';
import { authEvents, authStores } from './shared/model/auth';
import { useEffect } from 'react';

const App = () => {
    const isAuth = useStore(authStores.isAuth);
    console.log(12312);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authEvents.setIsAuthFn();
        }
    }, []);
    return (
        <ThemeProvider theme={theme.getLight()}>
            <GlobalStyles {...theme.getLight()} />
            <Router>
                <Routes>
                    <Route path={APP_ROUTE.login} element={<LoginPage />} />
                    <Route path={APP_ROUTE.root} element={isAuth ? <MainPage /> : <Navigate to={APP_ROUTE.login} />} />
                    <Route path="*" element={<Navigate to={APP_ROUTE.root} />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
