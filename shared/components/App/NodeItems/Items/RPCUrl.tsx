import { css } from '@emotion/react';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ITheme } from 'types/theme';
import { Copy } from '@shared/components';
import { getNodeRpcUrl } from '@modules/node';

type Props = Partial<Pick<Node, 'dnsName'>>;

export const RPCUrl = ({ dnsName }: Props) => {
  if (!dnsName) return <>-</>;

  const rpcUrl = getNodeRpcUrl(dnsName);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) =>
    e.stopPropagation();

  return (
    <a
      css={styles.wrapper}
      target="_blank"
      rel="noopener noreferrer"
      href={rpcUrl}
      onClick={handleClick}
    >
      <span css={styles.link}>{rpcUrl}</span>
      <Copy value={rpcUrl} />
    </a>
  );
};

const styles = {
  wrapper: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 6px;
  `,
  link: (theme: ITheme) => css`
    height: 23px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${theme.colorText};
    text-decoration: underline;
    text-underline-offset: 5px;
  `,
};
