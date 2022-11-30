import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { FC } from 'react';
import { styles } from './NodeCreateBlockchain.styles';

type Props = {
  inputValue: string;
  onBlockchainClicked: (id: string, name: string) => void;
};

export const NodeCreateBlockchain: FC<Props> = ({
  inputValue,
  onBlockchainClicked,
}) => {
  const { blockchains } = useGetBlockchains();

  return (
    <div css={styles.wrapper}>
      {blockchains
        .filter((b) => b.name?.toLowerCase().includes(inputValue.toLowerCase()))
        .map((b) => (
          <button
            css={styles.button}
            key={b.id}
            type="button"
            onClick={() => onBlockchainClicked(b.id!, b.name!)}
          >
            {b.name}
          </button>
        ))}
    </div>
  );
};
