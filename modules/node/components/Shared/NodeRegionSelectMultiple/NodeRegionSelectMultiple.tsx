import { RegionInfo } from '@modules/grpc/library/blockjoy/v1/host';
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
  Alert,
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

  const handleChange = (regionInfo: RegionInfo) => {
    let regionsCopy = selectedRegions ? [...selectedRegions!] : [];
    const foundRegion = regionsCopy.find(
      (nodeLauncherRegion) =>
        nodeLauncherRegion.regionInfo.region?.regionId ===
        regionInfo.region?.regionId,
    );

    if (foundRegion) {
      regionsCopy = regionsCopy.filter(
        (nodeLauncherRegion) =>
          nodeLauncherRegion.regionInfo.region?.regionId !==
          regionInfo.region?.regionId,
      );
    } else {
      regionsCopy.push({
        regionInfo,
        nodesToLaunch: 1,
        isValid: true,
      });
    }

    onChange(regionsCopy.length === 0 ? null : regionsCopy);
  };

  const handleAllocationChange = (
    regionInfo: RegionInfo,
    nodesToLaunch: number,
    isValid?: boolean,
  ) => {
    let regionsCopy = [...selectedRegions!];

    let foundHostIndex = regionsCopy.findIndex(
      (nodeLauncherRegion) =>
        nodeLauncherRegion.regionInfo.region?.regionId ===
        regionInfo.region?.regionId,
    );

    if (foundHostIndex < 0) return;

    regionsCopy[foundHostIndex] = {
      regionInfo,
      nodesToLaunch,
      isValid,
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

  const filteredRegions = regions.filter(
    (regionInfo) =>
      regionInfo.region?.regionKey
        ?.toLowerCase()
        .includes(debouncedSearchTerm?.toLowerCase()) ||
      regionInfo.region?.displayName
        ?.toLowerCase()
        .includes(debouncedSearchTerm?.toLowerCase()),
  );

  return (
    <>
      <DropdownWrapper isEmpty onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <DropdownButton
          isOpen={isOpen}
          text={
            <p>
              {!selectedRegions?.length
                ? 'Select Regions'
                : selectedRegions?.length === 1
                ? selectedRegions[0].regionInfo.region?.displayName ||
                  selectedRegions[0].regionInfo.region?.regionKey
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
              <p css={styles.dropdownEmpty}>No regions found</p>
            )}
            <ul>
              {filteredRegions?.map((regionInfo) => {
                const isDisabled = regionInfo.freeIps < 1;

                return (
                  <li key={regionInfo.region?.regionId}>
                    <label css={[styles.row, isDisabled && styles.rowDisabled]}>
                      <Checkbox
                        disabled={isDisabled}
                        id={`nodeRegion_${regionInfo?.region?.regionId}`}
                        name={regionInfo?.region?.regionKey!}
                        onChange={() => handleChange(regionInfo)}
                        checked={selectedRegions?.some(
                          (nodeLauncherRegion) =>
                            nodeLauncherRegion.regionInfo.region?.regionId ===
                            regionInfo?.region?.regionId,
                        )}
                      />
                      <p>
                        {regionInfo?.region?.displayName ||
                          regionInfo?.region?.regionKey}
                      </p>
                      <span css={styles.ipStatus} className="ip-status">
                        <Alert
                          additionalStyles={[styles.alert]}
                          isSuccess={regionInfo.freeIps > 0}
                        >{`${regionInfo.freeIps} IP${
                          regionInfo.freeIps !== 1 ? `s` : ''
                        }`}</Alert>
                      </span>
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
