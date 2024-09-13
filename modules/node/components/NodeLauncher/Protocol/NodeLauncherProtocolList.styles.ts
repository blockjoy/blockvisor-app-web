import { css } from '@emotion/react';
import { NUM_OF_BLOCKCHAIN_COLUMNS } from '@modules/node';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  scrollbar: (theme: ITheme) => css`
    overflow-x: hidden;
    overflow-y: auto;

    @media ${breakpoints.toXlrg} {
      height: 508px;
      max-height: 60vh;
    }

    @media ${breakpoints.fromXLrg} {
      max-height: calc(100svh - 172px);
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colorLabel};
    }
  `,
  cards: (isSidebarOpen: boolean) => (theme: ITheme) =>
    css`
      display: grid;
      gap: 8px;
      padding: 2px 12px 2px 2px;

      grid-template-columns: repeat(${NUM_OF_BLOCKCHAIN_COLUMNS['min']}, 1fr);

      @media ${breakpoints.fromTny} {
        grid-template-columns: repeat(${NUM_OF_BLOCKCHAIN_COLUMNS['tny']}, 1fr);
      }

      @media ${breakpoints.fromSml} {
        grid-template-columns: repeat(${NUM_OF_BLOCKCHAIN_COLUMNS['sml']}, 1fr);
      }

      @media ${breakpoints.fromMed} {
        grid-template-columns: repeat(${NUM_OF_BLOCKCHAIN_COLUMNS['med']}, 1fr);
      }

      @media ${breakpoints.fromLrg} {
        grid-template-columns: repeat(${NUM_OF_BLOCKCHAIN_COLUMNS['lrg']}, 1fr);
      }

      @media ${breakpoints.fromXLrg} {
        grid-template-columns: repeat(
          ${isSidebarOpen
            ? NUM_OF_BLOCKCHAIN_COLUMNS['xLrgSidebar']
            : NUM_OF_BLOCKCHAIN_COLUMNS['xLrg']},
          1fr
        );
      }

      @media ${breakpoints.fromHuge} {
        grid-template-columns: repeat(
          ${NUM_OF_BLOCKCHAIN_COLUMNS['huge']},
          1fr
        );
      }

      @media ${breakpoints.fromXHuge} {
        grid-template-columns: repeat(
          ${isSidebarOpen
            ? NUM_OF_BLOCKCHAIN_COLUMNS['xHugeSidebar']
            : NUM_OF_BLOCKCHAIN_COLUMNS['xHuge']},
          1fr
        );
      }

      &:hover > li > div {
        background: radial-gradient(
          800px circle at var(--xPos) var(--yPos),
          ${rgba(theme.colorPrimary || '#bff589', 0.4)},
          transparent 15%
        );
      }
    `,

  card: (theme: ITheme) => css`
    border: 1px solid ${theme.colorBorder};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
    background: radial-gradient(
      400px circle at 0 0,
      ${rgba(theme.colorPrimary || '#bff589', 0)},
      transparent 0%
    );
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: 0.15s;

    &:hover,
    &.focus {
      box-shadow: 0px 0px 0px 2px ${theme.colorInputOutline};

      &::before {
        opacity: 1;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      background: radial-gradient(
        500px circle at var(--xPos) var(--yPos),
        ${rgba(theme.colorPrimary || '#bff589', 0.1)},
        transparent 35%
      );
      opacity: 0;
      transition: all 0.15s ease-in-out;
    }

    :is(span, p) {
      opacity: 0.45;
      transition: 0.3s;
    }

    &:hover :is(span, p) {
      opacity: 1;
    }

    span {
      font-size: 38px;
    }

    p {
      font-weight: 400;
      font-size: 13px;
      color: ${rgba(theme.colorText || '#ffffff', 0.7)};
    }

    &.active {
      p {
        color: ${theme.colorPrimaryText};
      }
    }

    :is(.active, .focus) path {
      fill: ${theme.colorPrimary};
    }
  `,
  cardContent: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    height: calc(100% - 2px);
    width: calc(100% - 2px);
    padding: 7px;
    background: ${theme.colorCard};
    border-radius: inherit;
    transition: all 0.25s;

    &.active {
      background: ${rgba(theme.colorLightGrey || '#ffffff', 0.1)};
      background-color: ${theme.colorPrimary};
    }
  `,
};
