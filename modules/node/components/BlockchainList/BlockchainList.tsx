import { styles } from './BlockchainList.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/typo.styles';
import { BlockchainIcon } from '../BlockchainIcon/BlockchainIcon';
import IconEnter from '@public/assets/icons/enter.svg';
import { flex } from 'styles/utils.flex.styles';
import { useArrowNavigation } from '@shared/index';
import { useNodeWizard } from '@modules/node';

type Props = {
  blockchains: string[];
};

export function BlockchainList({ blockchains }: Props) {
  const { selectBlockchain } = useNodeWizard();
  const { elementRef } = useArrowNavigation<HTMLUListElement>();

  return (
    <ul ref={elementRef} tabIndex={0} css={[reset.list, styles.list]}>
      {blockchains.map((blockchain, idx) => (
        <>
          <li
            onClick={() => selectBlockchain(blockchain)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                selectBlockchain(blockchain);
              }
            }}
            key={idx}
            tabIndex={0}
            css={[
              styles.listItem,
              typo.body2,
              flex.display.flex,
              flex.align.center,
            ]}
          >
            <BlockchainIcon blockchain={blockchain} />
            <span css={[styles.blockchainText]}>{blockchain}</span>
            <IconEnter />
          </li>
        </>
      ))}
    </ul>
  );
}
