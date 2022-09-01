import { atom, useRecoilValue } from 'recoil';
// import { ThemeProvider as StyledThemeProvider, Global } from '@emotion/react';
import { ThemeProvider as StyledThemeProvider, css, Global } from "@emotion/react";
import { themeDark } from "../themes";

export const themeState = atom({
  key: 'themeState',
  default: themeDark,
});

type Props = {
    children: React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
    const theme = useRecoilValue(themeState);
    return <StyledThemeProvider theme={{...theme}}>
            <Global
                styles={css`
                    body {
                        background: ${theme.colorBackground};
                    }
                `}
                />
                {children}
            </StyledThemeProvider>
}

export default ThemeProvider;