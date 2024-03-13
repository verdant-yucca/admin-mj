import { DefaultTheme } from 'styled-components';
import { getBaseTokens } from '../getBaseTokens';

const getTokens = (): DefaultTheme => ({
    name: 'dark',
    colors: {
        primary: getBaseTokens().colors.blue[400],
        secondary: getBaseTokens().colors.yellow[100],
        mark: getBaseTokens().colors.red[100],
        bgMain: getBaseTokens().colors.dustBlue[900],
        bgColor: getBaseTokens().colors.dustBlue[50],

        bgHeader: getBaseTokens().colors.deepBlue[800],
        textPrimary: getBaseTokens().colors.dustBlue[0],
        textSecondary: getBaseTokens().colors.dustBlue[800],
        textDisabled: getBaseTokens().colors.dustBlue[800],
        textActive: getBaseTokens().colors.yellow[400],
        textHeader: getBaseTokens().colors.gray[500],

        ...getBaseTokens().colors
    },
    typography: getBaseTokens().typography,
    gameTypography: getBaseTokens().gameTypography
});

export { getTokens };
