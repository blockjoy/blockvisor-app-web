import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

type OverlayProps = {
  theme?: ITheme;
  isSidebarOpen: boolean;
  isOthersOpen: boolean;
};

export const overlayStyles = {
  overlay: css`
    position: fixed;
    z-index: 7;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    opacity: 0;
    visibility: hidden;
    transition-property: opacity, visibility;
    transition-duration: 0.4s;
  `,
  visible: css`
    opacity: 1;
    visibility: visible;
  `,
  hidden:
    ({ isSidebarOpen, isOthersOpen }: OverlayProps) =>
    (theme: ITheme) =>
      css`
        @media only screen and (min-width: ${theme.screenMd}) {
          ${isSidebarOpen &&
          !isOthersOpen &&
          css`
            opacity: 0;
            visibility: hidden;
          `}
        }
      `,
};
