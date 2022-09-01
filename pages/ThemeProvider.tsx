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

                    /* .apexcharts-tooltip {
                        opacity: 1 !important;
                    } */

                    body .apexcharts-tooltip.apexcharts-theme-light {
                        padding: 16px;
                        border: 0;
                        border-radius: 10px;
                        box-shadow: none;
                        background: rgba( 0, 0, 0, 0.4 );
                        backdrop-filter: blur( 10px );
                        -webkit-backdrop-filter: blur( 10px );
                    }

                    body .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {
                        background: transparent;
                        border: 0;
                    }
                `}
                />
                {children}
            </StyledThemeProvider>
}

export default ThemeProvider;