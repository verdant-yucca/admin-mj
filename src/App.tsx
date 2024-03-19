import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/application/styles/global';
import theme from '@/application/styles/theme';
import { APP_ROUTE } from '@/shared/constants/routes';
import { MainLayout } from '@/features/MainLayout';
import '@/shared/model/init';
import { LoginPage } from '@/pages/Login';
import { MainPage } from '@/pages/Main';
import { useStore } from 'effector-react';
import { authEvents, authStores } from './shared/model/auth';
import { useEffect } from 'react';
import { HistoryGateConnector } from './features/HistoryGateConnector';
import { Header } from './features/Header';
import { JsonEditorPage } from './pages/JsonEditor';
import { QueriesPage } from './pages/Queries';
import { UsersPage } from './pages/Users';

const App = () => {
    const isAuth = useStore(authStores.isAuth);

    useEffect(() => {
        //commented this code for dev without authorization
        // const token = localStorage.getItem('token');
        // if (token) {
        authEvents.setIsAuthFn();
        // }
    }, []);

    return (
        <ThemeProvider theme={theme.getLight()}>
            <GlobalStyles {...theme.getLight()} />
            <Header />
            <Router>
                <HistoryGateConnector />
                <Routes>
                    <Route path={APP_ROUTE.login} element={<LoginPage />} />
                    <Route path={APP_ROUTE.root} element={isAuth ? <MainPage /> : <Navigate to={APP_ROUTE.login} />} />
                    <Route
                        path={APP_ROUTE.jsonEditor}
                        element={isAuth ? <JsonEditorPage /> : <Navigate to={APP_ROUTE.login} />}
                    />
                    <Route
                        path={APP_ROUTE.users}
                        element={isAuth ? <UsersPage /> : <Navigate to={APP_ROUTE.login} />}
                    />
                    <Route
                        path={APP_ROUTE.queries}
                        element={isAuth ? <QueriesPage /> : <Navigate to={APP_ROUTE.login} />}
                    />
                    <Route path="*" element={<Navigate to={APP_ROUTE.root} />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
