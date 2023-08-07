import { ReactNode } from 'react';
import { styles } from './HostWrapper.styles';
import { HostLauncher } from '../HostLauncher/HostLauncher';
import { wrapper } from 'styles/wrapper.styles';

type Props = {
  children: ReactNode;
  title: ReactNode;
};

export const HostWrapper = ({ children, title }: Props) => {
  return (
    <>
      {title}
      <section css={[wrapper.main, styles.mainWrapper]}>
        <div css={styles.wrapper}>
          <div css={styles.leftWrapper}>{children}</div>
          <div css={styles.rightWrapper}>
            <HostLauncher />
          </div>
        </div>
      </section>
    </>
  );
};
