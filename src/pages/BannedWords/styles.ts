import styled from 'styled-components';
import JsonEditor from 'react-json-editor-ui';

export const JsonEditorStyled = styled(JsonEditor)`
    padding-left: 20px;
    padding-right: 20px;

    &.indexLine {
        height: 50px;
    }

    &.jsonValue {
        width: 80%;
    }
`;
