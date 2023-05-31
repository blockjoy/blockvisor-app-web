import { hostCPU, hostMemory, hostSpace } from '@shared/constants/lookups';
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
    if (
      filtersMemory[0] !== hostMemory.min ||
      filtersMemory[1] !== hostMemory.max
    )
      total++;

    const filtersCPU = get(hostAtoms.filtersCPU);
    if (filtersCPU[0] !== hostCPU.min || filtersCPU[1] !== hostCPU.max) total++;

    const filtersSpace = get(hostAtoms.filtersSpace);
    if (filtersSpace[0] !== hostSpace.min || filtersSpace[1] !== hostSpace.max)
      total++;

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
