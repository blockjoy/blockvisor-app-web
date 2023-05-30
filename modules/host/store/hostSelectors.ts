import { selector } from 'recoil';
import { hostAtoms } from './hostAtoms';

const filtersTotal = selector<number>({
  key: 'host.filters.total',
  get: ({ get }) => {
    const filtersStatusTotal = get(hostAtoms.filtersStatus).some(
      (s) => s.isChecked,
    );

    const total = [filtersStatusTotal].filter(Boolean).length + 1;

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
