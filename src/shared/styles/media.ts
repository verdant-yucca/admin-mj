import {
    css,
    DefaultTheme,
    CSSObject,
    ThemedStyledProps,
    InterpolationFunction,
    FlattenInterpolation,
    Interpolation
} from 'styled-components';

export const sizes = {
    desktop: '2880',
    desktopSmall: '1439',
    tablet: '1199',
    tabletSmall: '1023',
    laptop: '890',
    laptopSmall: '768',
    phoneBig: '640',
    phone: '540',
    phoneMedium: '470',
    phoneSmall: '375',
    phoneMostSmall: '320',
    zero: '0'
};

type KeysType = keyof typeof sizes;
type MediaFunction = <P extends object>(
    first: TemplateStringsArray | CSSObject | InterpolationFunction<ThemedStyledProps<P, DefaultTheme>>,
    ...interpolations: Array<Interpolation<ThemedStyledProps<P, DefaultTheme>>>
) => FlattenInterpolation<ThemedStyledProps<P, DefaultTheme>>;

export const media = (Object.keys(sizes) as KeysType[]).reduce(
    (acc, label) => {
        acc[label] = (first, ...interpolations) => css`
            @media (max-width: ${sizes[label]}px) {
                ${css(first, ...interpolations)}
            }
        `;

        return acc;
    },
    {} as { [key in KeysType]: MediaFunction }
);

export const makeCustomScrollBar = () => css`
    &::-webkit-scrollbar {
        height: 14px;
        width: 14px;

        background-color: ${({ theme }) => theme.colors.dustBlue[50]};
    }
    &::-webkit-scrollbar-thumb {
        border: 4px solid transparent;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.colors.dustBlue[200]};
        background-clip: padding-box;
    }
`;

export const hideScrollBar = () => css`
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb {
        height: 0;
        width: 0;
    }
`;
