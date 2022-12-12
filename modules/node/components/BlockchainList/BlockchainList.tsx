import { styles } from './BlockchainList.styles';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/typo.styles';
import { BlockchainIcon } from '../BlockchainIcon/BlockchainIcon';
import IconEnter from '@public/assets/icons/enter.svg';
import { flex } from 'styles/utils.flex.styles';
import { useNodeWizard, useSearchBlockchains } from '@modules/node';

type Props = {
  blockchains: { name: string; id: string }[];
};

export const BlockchainList = ({ blockchains }: Props) => {
  const { selectBlockchain } = useNodeWizard();
  const { resetSearch } = useSearchBlockchains();

  return (
    <ul tabIndex={0} css={[reset.list, styles.list]}>
      {blockchains.map((blockchain, idx) => (
        <li
          onClick={() => {
            resetSearch();
            selectBlockchain(blockchain.name);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              resetSearch();
              selectBlockchain(blockchain.name);
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
          <BlockchainIcon blockchain={blockchain.name} />
          <span css={[styles.blockchainText]}>{blockchain.name}</span>
          <IconEnter />
        </li>
      ))}
    </ul>
  );
};
