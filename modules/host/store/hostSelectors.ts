import { isEqual } from 'lodash';
import { hostFiltersDefaults } from '@shared/constants/lookups';
import { selector } from 'recoil';
import { hostAtoms } from './hostAtoms';

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

export const hostSelectors = {
  filtersTotal,
};
