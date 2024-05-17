import styled from 'styled-components';

export const Title = styled.p`
    ${({ theme }) => theme.typography['5'].fontBold};
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
`;
