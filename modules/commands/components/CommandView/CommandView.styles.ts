import { css } from '@emotion/react';
import { CommandExitCode } from '@modules/grpc/library/blockjoy/v1/command';
import { getCommandColor } from '@modules/commands/utils/getCommandColor';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    font-family: monospace;
    font-size: 15px;
    line-height: 1.6;
    padding: 6px 0;
    letter-spacing: -0.25px;
  `,
  time: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    margin-right: 16px;

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
