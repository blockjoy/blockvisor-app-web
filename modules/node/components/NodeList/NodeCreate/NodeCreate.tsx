import { styles } from './NodeCreate.styles';
import { ChangeEvent, useEffect, useState } from 'react';
import { useGetBlockchains } from '@modules/node/hooks/useGetBlockchains';
import { NodeCreateInput } from './NodeCreateInput';
import { NodeCreateBlockchain } from './NodeCreateBlockchain';
import { useNodeAdd } from '@modules/node/hooks/useNodeAdd';
import { useRouter } from 'next/router';

export const NodeCreate = () => {
  const { getBlockchains } = useGetBlockchains();

  const { createNode, hostList, loadLookups } = useNodeAdd();

  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>('');

  const [isBlockchainsOpen, setIsBlockchainsOpen] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsBlockchainsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsBlockchainsOpen(false);
  };

  const handleNodeTypeClicked = (type: string, blockchainId: string) => {
    const params: CreateNodeParams = {
      nodeType: +type ?? 0,
      blockchain: blockchainId ?? '',
      host: hostList[0].value,
    };

    createNode(params, (nodeId: string) => {
      setIsBlockchainsOpen(false);
      router.push(`/nodes/${nodeId}`);
    });
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
        css={[styles.overlay, isBlockchainsOpen ? styles.overlayVisible : null]}
      />
      <div css={styles.wrapper}>
        <NodeCreateInput
          inputValue={inputValue}
          isBlockchainsOpen={isBlockchainsOpen}
          onInputChanged={handleInputChanged}
          onInputMouseEnter={handleMouseEnter}
          onInputMouseLeave={handleMouseLeave}
        />
        {isBlockchainsOpen && (
          <NodeCreateBlockchain
            onInputMouseEnter={handleMouseEnter}
            onInputMouseLeave={handleMouseLeave}
            onNodeTypeClicked={handleNodeTypeClicked}
            inputValue={inputValue}
          />
        )}
      </div>
    </>
  );
};
