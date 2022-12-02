import { styles } from './NodeCreate.styles';

import { ChangeEvent, useEffect, useState } from 'react';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';

import { NodeCreateForm } from './NodeCreateForm';
import { NodeCreateInput } from './NodeCreateInput';
import { NodeCreateBlockchain } from './NodeCreateBlockchain';

type Blockchain = {
  id: string;
  name: string;
};

export const NodeCreate = () => {
  const { getBlockchains, blockchains, loading } = useGetBlockchains();

  const [inputValue, setInputValue] = useState<string>('');

  const [isBlockchainsOpen, setIsBlockchainsOpen] = useState<boolean>(false);

  const [blockchain, setBlockchain] = useState<Blockchain>({
    id: '',
    name: '',
  });

  const handleOverlayClicked = () => {
    setIsBlockchainsOpen(false);
  };

  const handleCloseClicked = () => {
    setIsBlockchainsOpen(false);
    setInputValue('');
  };

  const handleInputClicked = () => {
    setIsBlockchainsOpen(true);
  };

  const handleInputHovered = () => {
    setIsBlockchainsOpen(true);
  };

  const handleInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isBlockchainsOpen) {
      setIsBlockchainsOpen(true);
    }
    setInputValue(event.target.value);
  };

  const handleStartClicked = () => {
    setIsBlockchainsOpen(false);
  };

  useEffect(() => {
    getBlockchains();
  }, []);

  return (
    <>
      <div
        onClick={handleOverlayClicked}
        css={[styles.overlay, isBlockchainsOpen ? styles.overlayVisible : null]}
      />
      <div css={styles.wrapper}>
        <NodeCreateInput
          inputValue={inputValue}
          isBlockchainsOpen={isBlockchainsOpen}
          onInputChanged={handleInputChanged}
          onInputHovered={handleInputHovered}
          onInputClicked={handleInputClicked}
          onCloseClicked={handleCloseClicked}
          onStartClicked={handleStartClicked}
        />
        {isBlockchainsOpen && <NodeCreateBlockchain inputValue={inputValue} />}
      </div>
    </>
  );
};
