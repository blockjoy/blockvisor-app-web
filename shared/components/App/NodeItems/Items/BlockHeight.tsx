import { css } from '@emotion/react';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { ITheme } from 'types/theme';
import { NodePartials } from '@shared/components';
import { NodeStatePresentationOptions } from '@modules/node';
import IconBlockHeight from '@public/assets/icons/app/BlockHeight.svg';
import IconCog from '@public/assets/icons/common/Cog.svg';

type Props = Partial<Pick<Node, 'blockHeight'>> & {
  view?: NodeStatusView;
};

export const BlockHeight = ({ blockHeight, view = 'default' }: Props) => {
  const Icon = blockHeight! > -1 ? IconBlockHeight : IconCog;
  const options: NodeStatePresentationOptions =
    blockHeight! > -1 ? {} : { iconSpining: true };

  return (
    <NodePartials.NodeStatusTextWIcon
      Icon={Icon}
      options={options}
      view={view}
      {...(view === 'default' && {
        iconSize: '14px',
      })}
      additionalTextStyles={[styles.text(view, blockHeight)]}
    >
      {blockHeight?.toLocaleString('en-US') ?? 'Syncing'}
    </NodePartials.NodeStatusTextWIcon>
  );
};

const styles = {
  text: (view?: NodeStatusView, blockHeight?: number) => (theme: ITheme) =>
    css`
      text-transform: capitalize;
      ${view === 'default' &&
      `
        font-size: 14px;
        color: ${blockHeight! > -1 ? theme.colorText : theme.colorDefault};
        `}
      letter-spacing: 0;
    `,
};
