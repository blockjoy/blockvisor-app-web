import { css } from '@emotion/react';
import { CommandExitCode } from '@modules/grpc/library/blockjoy/v1/command';
import { getCommandColor } from '@modules/commands/utils/getCommandColor';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    font-family: monospace;
    font-size: 16px;
    line-height: 1.4;
    padding-top: 6px;
    padding-bottom: 6px;
    letter-spacing: -0.25px;
  `,
  time: (theme: ITheme) => css`
    color: ${theme.colorLabel};

    p {
      display: inline;
    }
  `,
  message: (exitCode?: CommandExitCode) => (theme: ITheme) =>
    css`
      color: ${getCommandColor(theme, exitCode)};
      vertical-align: middle;
    `,
};
