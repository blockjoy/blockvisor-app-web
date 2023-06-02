import { isEqual } from 'lodash';
import { hostFiltersDefaults } from '@shared/constants/lookups';
import { selector } from 'recoil';
import { hostAtoms } from './hostAtoms';

const filtersTotal = selector<number>({
  key: 'host.filters.total',
  get: ({ get }) => {
    const filtersStatusTotal = get(hostAtoms.filtersStatus).some(
      (s) => s.isChecked,
    );

    let total = [filtersStatusTotal].filter(Boolean).length + 1;

    const filtersMemory = get(hostAtoms.filtersMemory);
    if (!isEqual(filtersMemory, hostFiltersDefaults.memory)) total++;

    const filtersCPU = get(hostAtoms.filtersCPU);
    if (!isEqual(filtersCPU, hostFiltersDefaults.cpu)) total++;

    const filtersSpace = get(hostAtoms.filtersSpace);
    if (!isEqual(filtersSpace, hostFiltersDefaults.space)) total++;

    return total;
  },
});

const filtersStatusTotal = selector<number>({
  key: 'host.filters.status.total',
  get: ({ get }) => {
    const filtersStatusAll = get(hostAtoms.filtersStatus);
    const filtersStatusTotal = filtersStatusAll?.filter(
      (item) => item.isChecked,
    ).length;
    return filtersStatusTotal;
  },
});

export const hostSelectors = {
  filtersTotal,
  filtersStatusTotal,
};
