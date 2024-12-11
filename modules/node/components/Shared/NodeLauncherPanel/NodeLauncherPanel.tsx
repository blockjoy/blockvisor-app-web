import { PropsWithChildren } from 'react';
import { Scrollbar } from '@shared/components';
import { css, SerializedStyles } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { isDesktop } from 'react-device-detect';
import { ITheme } from 'types/theme';

type Props = {
  additionalStyles?: (theme: ITheme) => SerializedStyles;
} & PropsWithChildren;

const styles = {
  wrapper: css`
    flex: 1 1 auto;
    @media ${breakpoints.fromXLrg} {
      flex: 1 1 400px;
      min-width: 400px;
      max-height: calc(100vh - 72px);
      min-height: calc(100vh - 72px);
    }
  `,
};

export const NodeLauncherPanel = ({ additionalStyles, children }: Props) => {
  return (
    <div css={[styles.wrapper, Boolean(additionalStyles) && additionalStyles]}>
      {!isDesktop ? (
        <>{children}</>
      ) : (
        <Scrollbar additionalStyles={[styles.wrapper]}>{children}</Scrollbar>
      )}
    </div>
  );
};
