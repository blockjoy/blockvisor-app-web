import { css, keyframes } from '@emotion/react';
import { ITheme } from 'types/theme';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { getNodeJobProgress } from '@modules/node';

type Props = {
  jobs?: Node['jobs'];
  view?: NodeStatusView;
};

export const NodeStatusDownloader = ({ jobs, view = 'default' }: Props) => {
  if (!jobs?.length) return <></>;

  const progress = getNodeJobProgress(jobs!);

  const current = progress?.current;
  const total = progress?.total;

  const isDownloading = current! >= 0 && current !== total;

  if (!isDownloading) return <></>;

  const percentageWithMinimum = current! > 0 ? (current! / total!) * 100 : 5;
  const percentage = current! > 0 ? ((current! / total!) * 100).toFixed(2) : 0;

  if (view === 'badge') {
    return (
      <>
        <span
          css={styles.backgroundWrapper}
          style={{ width: `${percentageWithMinimum}%` }}
        >
          <span css={styles.background} />
        </span>
        <span css={styles.value}>{`${percentage}%`}</span>
      </>
    );
  }

  return <>{`${percentage}%`}</>;
};

const move = keyframes`
  0% {
    translate: 0 0;
  }
  100% {
    translate: -35px 0;
  }
`;

export const styles = {
  backgroundWrapper: (theme: ITheme) => css`
    position: absolute;
    z-index: -1;
    overflow: hidden;
    top: 0;
    left: 0;
    bottom: 0;
    opacity: 0.5;
    transition: width 0.3s;

    ::before,
    ::after {
      content: '';
      position: inherit;
      top: 0;
      bottom: 0;
    }

    ::before {
      z-index: 2;
      right: 0;
      width: 100%;
      background: linear-gradient(transparent, ${theme.colorCard} 100%);
    }

    ::after {
      z-index: 1;
      left: -50%;
      width: 350px;
      background: repeating-linear-gradient(
        45deg,
        rgb(255 255 255 / 20%),
        rgb(255 255 255 / 20%) 6px,
        rgb(255 255 255 / 10%) 6px,
        rgb(255 255 255 / 10%) 12px
      );
      animation: ${move} 0.8s infinite linear;
    }
  `,
  background: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  value: (theme: ITheme) => css`
    color: ${theme.colorPrimary};
    position: relative;
    margin-left: 5px;
    font-style: normal;
    font-size: 10px;
  `,
};
