import { styles } from './BlockchainList.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/typo.styles';
import { BlockchainIcon } from '../BlockchainIcon/BlockchainIcon';
import IconEnter from '@public/assets/icons/enter.svg';
import { flex } from 'styles/utils.flex.styles';
import { useArrowNavigation } from '@shared/index';

type Props = {
  blockchains: string[];
};

export function BlockchainList({ blockchains }: Props) {
  const { elementRef } = useArrowNavigation<HTMLUListElement>();
  return (
    <ul ref={elementRef} tabIndex={0} css={[reset.list, styles.list]}>
      {blockchains.map((blockchain) => (
        <li tabIndex={0} css={[styles.listItem]}>
          <div css={[styles.blockchain, typo.body2]}>
            <div css={[flex.display.flex, flex.align.center]}>
              <BlockchainIcon blockchain={blockchain} />
              <span css={[styles.blockchainText]}>{blockchain}</span>
            </div>
            <IconEnter />
          </div>
        </li>
      ))}
    </ul>
  );
}
