import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { ITheme } from 'types/theme';

const styles = {
  error: (theme: ITheme) => css`
    position: relative;
    height: 0;
    overflow: hidden;
    font-size: 14px;
    line-height: 36px;
    color: ${theme.colorDanger};
    will-change: height, padding-top;
    transition: 0.3s;
  `,
  errorVisible: css`
    padding-top: 10px;
  `,
  p: css`
    position: absolute;
    top: 10px;
    left: 0;
    line-height: 1.6;
  `,
};

type Props = {
  isVisible: boolean;
  children: React.ReactNode;
};

export const FormError = ({ children, isVisible }: Props) => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(isVisible ? paragraphRef.current?.clientHeight! + 10 : 0);
  }, [isVisible]);

  return (
    <div
      css={[styles.error, isVisible && styles.errorVisible]}
      style={{ height: `${height}px` }}
    >
      <p ref={paragraphRef} css={styles.p}>
        {children}
      </p>
    </div>
  );
};
