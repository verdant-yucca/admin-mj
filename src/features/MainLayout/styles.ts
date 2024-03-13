import styled from 'styled-components';
import { Layout } from 'antd';
const { Content } = Layout;

export const StyledContent = styled(Content)`
    padding: 24px;
    min-height: calc(100dvh - ${200}px);
`;
