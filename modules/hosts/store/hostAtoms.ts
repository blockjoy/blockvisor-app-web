import { atom } from 'recoil';

export const bla = '';

const host = atom<Host | null>({
  key: 'host.single',
  default: null,
});
const hostLoading = atom<boolean | null>({
  key: 'host.loading',
  default: null,
});

const hosts = atom<Host[] | null>({
  key: 'hosts.list',
  default: null,
});

const hostsLoading = atom<boolean | null>({
  key: 'hosts.loading',
  default: null,
});

export const hostsAtoms = {
  host,
  hostLoading,
  hosts,
  hostsLoading,
};
