import { SerializedStyles } from '@emotion/react';
import { FC, ReactNode } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { isMobile } from 'react-device-detect';
import { styles } from './Scrollbar.styles';

type Props = {
  children: ReactNode;
  additionalStyles?: SerializedStyles[];
};

export const Scrollbar: FC<Props> = ({ children, additionalStyles }) =>
  isMobile ? (
    <div
      css={[styles.mobileWrapper, additionalStyles ? [additionalStyles] : null]}
    >
      {children}
    </div>
  ) : (
    <PerfectScrollbar css={additionalStyles ? [additionalStyles] : null}>
      {children}
    </PerfectScrollbar>
  );
