import styled from 'styled-components';
import { FloatButton } from 'antd';

export const StyledFloatButton = styled(FloatButton)`
    position: absolute;
    top: 4px;
    right: 24px;
    width: 20px;
    height: 20px;
    background-color: #961212;
    font-size: 10px;

    .ant-float-btn-content {
        padding: 0;
    }

    .ant-float-btn-body {
        background-color: #bd4646;
    }

    .anticon-redo {
        color: white;
        margin-left: -6px;
        width: 14px;
        height: 14px;
    }
`;
