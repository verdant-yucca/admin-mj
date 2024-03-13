import { createGlobalStyle, css, DefaultTheme } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
${(theme: DefaultTheme) => css`
    *,
    &::after,
    &:before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html,
    body {
        scroll-behavior: smooth;
        background-color: white;
    }

    body {
        font: ${theme.typography['0'].fontRegular};

        * {
            &::-webkit-scrollbar {
                width: 2px;
                height: 2px;
                border-radius: 8px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: ${theme.colors.gray['300']};
            }
        }
    }

    a {
        color: inherit;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
    }

    ul {
        list-style: none;
    }

    button,
    input,
    select,
    textarea {
        outline: none;
        background: none;
        border: none;
        -webkit-tap-highlight-color: transparent;
    }
`}
`;
