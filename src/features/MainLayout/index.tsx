import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { StyledContent } from './styles';

export const MainLayout = () => (
    <Layout>
        <Header />
        <Layout>
            <StyledContent>
                <Outlet />
            </StyledContent>
        </Layout>
    </Layout>
);
