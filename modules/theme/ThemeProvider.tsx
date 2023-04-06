import { atom, useRecoilValue } from 'recoil';
// import { ThemeProvider as StyledThemeProvider, Global } from '@emotion/react';
import {
  ThemeProvider as StyledThemeProvider,
  css,
  Global,
} from '@emotion/react';
import { themeDark } from '../../themes';
import { ITheme } from 'types/theme';
import { rgba } from 'polished';

export const themeState = atom({
  key: 'themeState',
  default: themeDark,
});

type Props = {
  children: React.ReactNode;
};

const globalStyles = (theme: ITheme) => css`
  body {
    background: ${theme.colorBackground};

    /* select styles */
    select {
      transition: box-shadow;
      accent-color: ${theme.colorPrimary};
      &:focus {
        box-shadow: 0 0 0 3px ${rgba(theme.colorPrimary || '#fff', 0.3)};
      }
    }

    /* apexcharts */
    & .apexcharts-tooltip.apexcharts-theme-light {
      padding: 16px;
      border: 0;
      border-radius: 10px;
      box-shadow: none;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    & .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {
      background: transparent;
      border: 0;
    }

    /* toastify */
    & .Toastify__toast {
      box-shadow: none;
      font-family: var(--font-family-primary);
      font-weight: 600;
    }

    & .Toastify__toast-container.Toastify__toast-container--bottom-right {
      right: 100px !important;
      bottom: 0 !important;
    }

    & .Toastify__toast-icon {
      display: none;
    }

    & .Toastify__toast--success {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
    }

    & .Toastify__toast--error {
      background: ${theme.colorDanger};
      color: ${theme.colorText};

      .Toastify__close-button path {
        fill: ${theme.colorText};
      }
    }

    & .Toastify__close-button {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);

      & path {
        fill: ${theme.colorPrimaryText};
      }
    }

    & .Toastify__progress-bar--success {
      background-color: ${theme.colorLabel};
    }

    & .Toastify__close-button--light {
      opacity: 1;
    }
  }
`;

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = useRecoilValue(themeState);
  return (
    <StyledThemeProvider theme={{ ...theme }}>
      <Global styles={globalStyles} />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
