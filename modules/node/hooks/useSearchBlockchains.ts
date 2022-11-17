import { useRecoilState, useRecoilValue } from 'recoil';
import { blockchainsAtoms, blockchainSelectors } from '../store/blockchains';

export function useSearchBlockchains() {
  const [, setSearchTerm] = useRecoilState(blockchainsAtoms.blockchainSearch);

  const filteredBlockchains = useRecoilValue(
    blockchainSelectors.filteredBySearchTermBlockchains,
  );

  const searchBlockchains = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const resetSearch = () => {
    setSearchTerm('');
  };

  return {
    searchBlockchains,
    resetSearch,
    blockchains: filteredBlockchains,
  };
}
