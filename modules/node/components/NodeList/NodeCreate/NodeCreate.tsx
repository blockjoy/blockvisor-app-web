import { styles } from './NodeCreate.styles';

import { ChangeEvent, useEffect, useState } from 'react';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';

import { NodeCreateInput } from './NodeCreateInput';
import { NodeCreateBlockchain } from './NodeCreateBlockchain';
import { useNodeAdd } from '@modules/node/hooks/useNodeAdd';
import { useRouter } from 'next/router';

type Blockchain = {
  id: string;
  name: string;
};

export const NodeCreate = () => {
  const { getBlockchains } = useGetBlockchains();

  const { createNode, hostList, loadLookups } = useNodeAdd();

  const router = useRouter();

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

  const handleNodeTypeClicked = (type: string, blockchainId: string) => {
    const params: CreateNodeParams = {
      nodeType: +type ?? 0,
      blockchain: blockchainId ?? '',
      host: hostList[0].value,
    };

    createNode(params, (nodeId: string) => {
      router.push(`/nodes/${nodeId}`);
    });
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
    loadLookups();
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
        {isBlockchainsOpen && (
          <NodeCreateBlockchain
            onNodeTypeClicked={handleNodeTypeClicked}
            inputValue={inputValue}
          />
        )}
      </div>
    </>
  );
};
