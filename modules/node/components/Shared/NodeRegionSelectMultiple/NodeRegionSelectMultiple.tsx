import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import {
  nodeAtoms,
  nodeLauncherAtoms,
  NodeLauncherRegion,
} from '@modules/node';
import {
  DropdownWrapper,
  DropdownButton,
  DropdownMenu,
  Checkbox,
  Scrollbar,
} from '@shared/components';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { NodeRegionSelectMultipleAllocation } from './NodeRegionSelectMultipleAllocation/NodeRegionSelectMultipleAllocation';
import { useRecoilValue } from 'recoil';
import { styles } from './NodeRegionSelectMultiple.styles';
import { useDebounce } from '@shared/hooks/useDebounce';

type Props = {
  onChange: (regions: NodeLauncherRegion[] | null) => void;
};

export const NodeRegionSelectMultiple = ({ onChange }: Props) => {
  const regions = useRecoilValue(nodeAtoms.regions);
  const selectedRegions = useRecoilValue(nodeLauncherAtoms.selectedRegions);

  const searchRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [searchText, setSearchText] = useState('');
  const debouncedSearchTerm = useDebounce(searchText, 500);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleChange = (region: Region) => {
    let regionsCopy = selectedRegions ? [...selectedRegions!] : [];
    const foundRegion = regionsCopy.find((r) => r.region.name === region.name);

    if (foundRegion) {
      regionsCopy = regionsCopy.filter((r) => r.region.name !== region.name);
    } else {
      regionsCopy.push({
        region,
        nodesToLaunch: 1,
      });
    }

    onChange(regionsCopy.length === 0 ? null : regionsCopy);
  };

  const handleAllocationChange = (region: Region, nodesToLaunch: number) => {
    let regionsCopy = [...selectedRegions!];

    let foundHostIndex = regionsCopy.findIndex(
      (r) => r.region.name === region.name,
    );

    if (foundHostIndex < 0) return;

    regionsCopy[foundHostIndex] = {
      region,
      nodesToLaunch,
    };

    onChange(regionsCopy);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen && searchRef?.current) {
        searchRef.current?.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const filteredRegions = regions.filter((r) =>
    r.name?.toLowerCase().includes(debouncedSearchTerm?.toLowerCase()),
  );

  return (
    <>
      <DropdownWrapper isEmpty onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <DropdownButton
          isOpen={isOpen}
          text={
            <p>
              {!selectedRegions?.length
                ? 'Auto select'
                : selectedRegions?.length === 1
                ? selectedRegions[0].region.name
                : `${selectedRegions?.length} regions selected`}
            </p>
          }
          onClick={() => setIsOpen(!isOpen)}
        />
        <DropdownMenu additionalStyles={styles.dropdown} isOpen={isOpen}>
          <div css={styles.dropdownHeader}>
            <input
              ref={searchRef}
              css={styles.searchInput}
              onInput={handleSearchInput}
              type="text"
              placeholder="Search..."
            />
          </div>

          <Scrollbar additionalStyles={[styles.scrollbar]}>
            {!filteredRegions?.length && (
              <p css={styles.dropdownEmpty}>No hosts found</p>
            )}
            <ul>
              {filteredRegions?.map((region) => {
                return (
                  <li key={region.name}>
                    <label css={styles.row}>
                      <Checkbox
                        id={region.name}
                        name={region.name!}
                        onChange={() => handleChange(region)}
                        checked={selectedRegions?.some(
                          (r) => r.region.name === region.name,
                        )}
                      />
                      <p>{region.name}</p>
                    </label>
                  </li>
                );
              })}
            </ul>
          </Scrollbar>
        </DropdownMenu>
      </DropdownWrapper>
      {selectedRegions?.length! > 0 && (
        <NodeRegionSelectMultipleAllocation
          onChange={handleChange}
          onRegionAllocationChanged={handleAllocationChange}
        />
      )}
    </>
  );
};
