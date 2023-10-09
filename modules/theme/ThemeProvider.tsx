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

    p a {
      position: relative;
      color: ${theme.colorText};
    }

    p a::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background: ${theme.colorText};
      opacity: 0.5;
      transition: 0.3s;
    }

    p a:hover::after {
      opacity: 1;
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

    & .Toastify__notification {
      background: ${theme.colorLightGrey};
      box-shadow: 0 0 10px rgb(0 0 0 / 30%);
      border-radius: 6px;

      & .Toastify__toast-body {
        padding: 16px;
      }

      & .Toastify__close-button {
        position: absolute;
        top: 20px;
        right: 20px;
        transform: translateY(0);
        width: 20px;
        height: 20px;

        & svg {
          width: 100%;
          height: 100%;
        }

        & path {
          fill: ${theme.colorText};
        }
      }

      & .Toastify__progress-bar {
        background: ${theme.colorPrimary};
      }

      h5 {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 10px;
        color: ${theme.colorText};
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 20px;

        svg {
          display: block;
          width: 20px;
          height: auto;
          & path {
            fill: ${theme.colorPrimary};
          }
        }
      }

      p {
        color: ${theme.colorDefault};
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
      }

      a {
        display: block;
        color: ${theme.colorDefault};
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        text-decoration-line: underline;
        margin-top: 15px;

        &:hover {
          color: ${theme.colorText};
        }
      }
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
