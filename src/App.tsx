import { Route, Routes } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@/application/styles/global';
import theme from '@/application/styles/theme';
import { PrivateMiddleware, PublicMiddleware } from '@/features/middlewares';
import { APP_ROUTE } from '@/shared/constants/routes';
import { MainLayout } from '@/features/MainLayout';
import { LoginPage } from '@/pages/Login';
import { MainPage } from '@/pages/Main';

const App = () => {
    return (
        <ThemeProvider theme={theme.getLight()}>
            <GlobalStyles {...theme.getLight()} />
            <Routes>
                <Route element={<PublicMiddleware />}>
                    <Route element={<LoginPage />} path={APP_ROUTE.login} />
                </Route>

                <Route element={<PrivateMiddleware />}>
                    <Route element={<MainLayout />}>
                        <Route index element={<MainPage />} path={APP_ROUTE.root} />
                    </Route>
                </Route>
            </Routes>
        </ThemeProvider>
    );
};

export default App;
