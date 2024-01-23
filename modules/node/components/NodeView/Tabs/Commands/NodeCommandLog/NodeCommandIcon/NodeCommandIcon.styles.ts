import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { CommandExitCode } from '@modules/grpc/library/blockjoy/v1/command';
import { getCommandColor } from '@modules/commands';

export const styles = {
  icon: (exitCode?: CommandExitCode) => (theme: ITheme) =>
    css`
      display: inline-grid;
      vertical-align: middle;
      margin-left: 16px;
      margin-right: 10px;
      color: ${getCommandColor(theme, exitCode)};
    `,
};
