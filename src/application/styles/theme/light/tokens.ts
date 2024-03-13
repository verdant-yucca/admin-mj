import { DefaultTheme } from 'styled-components';
import { getBaseTokens } from '../getBaseTokens';

const getTokens = (): DefaultTheme => ({
    name: 'light',
    colors: {
        primary: getBaseTokens().colors.blue[300],
        secondary: getBaseTokens().colors.yellow[100],
        mark: getBaseTokens().colors.red[100],
        bgMain: getBaseTokens().colors.dustBlue[0],
        bgColor: getBaseTokens().colors.dustBlue[50],

        bgHeader: getBaseTokens().colors.dustBlue[0],
        textPrimary: getBaseTokens().colors.dustBlue['800'],
        textSecondary: getBaseTokens().colors.dustBlue[0],
        textDisabled: getBaseTokens().colors.dustBlue['50'],
        textActive: getBaseTokens().colors.blue['700'],
        textHeader: getBaseTokens().colors.deepBlue['800'],

        ...getBaseTokens().colors
    },
    typography: getBaseTokens().typography,
    gameTypography: getBaseTokens().gameTypography
});

export { getTokens };
