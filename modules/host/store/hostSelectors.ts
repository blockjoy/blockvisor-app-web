import isEqual from 'lodash/isEqual';
import { hostFiltersDefaults } from '@shared/constants/lookups';
import { selector } from 'recoil';
import { hostAtoms } from './hostAtoms';
import { Host } from '@modules/grpc/library/blockjoy/v1/host';

const filtersTotal = selector<number>({
  key: 'host.filters.total',
  get: ({ get }) => {
    let total = 1;

    const filtersMemory = get(hostAtoms.filtersMemory);
    if (!isEqual(filtersMemory, hostFiltersDefaults.memory)) total++;

    const filtersCPU = get(hostAtoms.filtersCPU);
    if (!isEqual(filtersCPU, hostFiltersDefaults.cpu)) total++;

    const filtersSpace = get(hostAtoms.filtersSpace);
    if (!isEqual(filtersSpace, hostFiltersDefaults.space)) total++;

    return total;
  },
});

const hostListSorted = selector<Host[]>({
  key: 'hostList.sorted',
  get: ({ get }) => {
    const hosts = get(hostAtoms.hostList);
    return [...hosts].sort((orgA: Host, orgB: Host) => {
      if (orgA.name!.toLocaleLowerCase() < orgB.name!.toLocaleLowerCase())
        return -1;
      if (orgA.name!.toLocaleLowerCase() > orgB.name!.toLocaleLowerCase())
        return 1;
      return 0;
    });
  },
});

export const hostSelectors = {
  filtersTotal,
  hostListSorted,
};
