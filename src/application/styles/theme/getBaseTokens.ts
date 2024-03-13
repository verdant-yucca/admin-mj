import './fonts.css';

const getBaseTokens = () => {
    const fontFamily = 'Noto Sans';
    const gameFontFamily = 'GomariceRocks';

    return {
        colors: {
            dustBlue: {
                0: '#ffff',
                50: '#edf0fc',
                100: '#d3dceb',
                200: '#bac4d8',
                300: '#a0acc4',
                400: '#8b98b3',
                500: '#7786a4',
                600: '#687792',
                700: '#56637a',
                800: '#465064',
                900: '#323B4C'
            },
            gray: {
                20: '#efeff2',
                30: '#687792',
                50: '#fafafa',
                80: '#e7ebee',
                90: '#a6aebd',
                100: '#f6f6f6',
                150: '#465064',
                200: '#f0f0f0',
                300: '#e2e2e2',
                400: '#c0c0c0',
                500: '#a1a1a1',
                600: '#787878',
                700: '#636363',
                800: '#444444',
                900: '#232323'
            },
            blue: {
                50: '#e3f2ff',
                100: '#bcdeff',
                200: '#90c9ff',
                300: '#63b4ff',
                400: '#42a4ff',
                500: '#2594fe',
                600: '#2786ef',
                700: '#2574db',
                800: '#2462c9',
                900: '#2243a8'
            },
            green: {
                20: '#4FC601',
                30: '#aac554',
                50: '#e8f5ea',
                100: '#c8e7ca',
                200: '#a6d8a9',
                300: '#82ca87',
                400: '#66be6d',
                500: '#4cb253',
                600: '#43a34a',
                700: '#38913f',
                800: '#2e8035',
                900: '#1b6122'
            },
            yellow: {
                50: '#FFF9E0',
                100: '#FFEEB1',
                200: '#FFE47D',
                300: '#FFDB44',
                400: '#FFD100',
                500: '#FFC800',
                550: '#FFF030',
                600: '#FFB900',
                700: '#FFA500',
                800: '#FF9300',
                900: '#FF7200'
            },
            red: {
                20: '#c87878',
                50: '#fbe9e7',
                100: '#ffcbbc',
                200: '#ffaa90',
                300: '#ff8964',
                400: '#ff6e42',
                500: '#ff5421',
                600: '#f44e1d',
                700: '#e64718',
                800: '#d84014',
                900: '#bf330a'
            },
            deepBlue: {
                50: '#e5e9ef',
                100: '#bdc7d9',
                200: '#93a3c0',
                300: '#6a7fa6',
                400: '#4b6595',
                500: '#274c86',
                600: '#21457e',
                700: '#173c72',
                800: '#103366',
                900: '#07224f'
            },
            orange: {
                50: '#fff3df',
                100: '#ffdfaf',
                200: '#ffca7b',
                300: '#ffb444',
                400: '#ffa413',
                500: '#ff9400',
                600: '#fb8800',
                700: '#f57700',
                800: '#ef6700',
                900: '#e74a00'
            },
            purple: {
                50: '#f2e5ff',
                100: '#d9b3ff',
                200: '#bf80ff',
                300: '#a54dff',
                400: '#8c1aff',
                500: '#7200e6',
                600: '#5900b3',
                700: '#3f0080',
                800: '#26004d',
                900: '#0d001a'
            },
            brown: {
                50: '#ffe4d3',
                100: '#f1c3b5',
                200: '#d3a092',
                300: '#b57e6d',
                400: '#9f6352',
                500: '#894937',
                600: '#7c4031',
                650: '#823801',
                700: '#6c3428',
                800: '#5d2821',
                900: '#4c1a18'
            }
        },
        typography: {
            '8': {
                fontRegular: `500 44px/42px ${fontFamily}`,
                fontBold: `900 44px/42px ${fontFamily}`
            },
            '7': {
                fontRegular: `500 38px/38px ${fontFamily}`,
                fontBold: `700 38px/38px ${fontFamily}`
            },
            '6': {
                fontRegular: `500 32px/48px ${fontFamily}`,
                fontBold: `700 32px/48px ${fontFamily}`
            },
            '5': {
                fontRegular: `500 28px/28px ${fontFamily}`,
                fontBold: `700 28px/28px ${fontFamily}`
            },
            '4': {
                fontRegular: `500 24px/24px ${fontFamily}`,
                fontBold: `700 24px/24px ${fontFamily}`
            },
            '3': {
                fontRegular: `500 22px/22px ${fontFamily}`,
                fontBold: `700 22px/22px ${fontFamily}`
            },
            '2': {
                fontRegular: `500 20px/20px ${fontFamily}`,
                fontBold: `700 20px/20px ${fontFamily}`
            },
            '1': {
                fontRegular: `500 18px/18px ${fontFamily}`,
                fontBold: `700 18px/18px ${fontFamily}`
            },
            '0': {
                fontRegular: `500 16px/16px ${fontFamily}`,
                fontBold: `700 16px/16px ${fontFamily}`
            },
            '-1': {
                fontRegular: `500 14px/14px ${fontFamily}`,
                fontBold: `700 14px/14px ${fontFamily}`
            },
            '-2': {
                fontRegular: `500 12px/12px ${fontFamily}`,
                fontBold: `700 12px/12px ${fontFamily}`
            }
        },
        gameTypography: {
            '8': {
                fontRegular: `500 44px/42px ${gameFontFamily}`,
                fontBold: `900 44px/42px ${gameFontFamily}`
            },
            '7': {
                fontRegular: `500 38px/38px ${gameFontFamily}`,
                fontBold: `700 38px/38px ${gameFontFamily}`
            },
            '6': {
                fontRegular: `500 32px/48px ${gameFontFamily}`,
                fontBold: `700 32px/48px ${gameFontFamily}`
            },
            '5': {
                fontRegular: `500 28px/28px ${gameFontFamily}`,
                fontBold: `700 28px/28px ${gameFontFamily}`
            },
            '4': {
                fontRegular: `500 24px/24px ${gameFontFamily}`,
                fontBold: `700 24px/24px ${gameFontFamily}`
            },
            '3': {
                fontRegular: `500 22px/22px ${gameFontFamily}`,
                fontBold: `700 22px/22px ${gameFontFamily}`
            },
            '2': {
                fontRegular: `500 20px/20px ${gameFontFamily}`,
                fontBold: `700 20px/20px ${gameFontFamily}`
            },
            '1': {
                fontRegular: `500 18px/18px ${gameFontFamily}`,
                fontBold: `700 18px/18px ${gameFontFamily}`
            },
            '0': {
                fontRegular: `500 16px/16px ${gameFontFamily}`,
                fontBold: `700 16px/16px ${gameFontFamily}`
            },
            '-1': {
                fontRegular: `500 14px/14px ${gameFontFamily}`,
                fontBold: `700 14px/14px ${gameFontFamily}`
            },
            '-2': {
                fontRegular: `500 12px/12px ${gameFontFamily}`,
                fontBold: `700 12px/12px ${gameFontFamily}`
            }
        }
    };
};

export { getBaseTokens };
