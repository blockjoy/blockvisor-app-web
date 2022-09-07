import { layoutState } from '@modules/layout/store';
import { useRecoilValue } from 'recoil';
import { Drawer, DrawerContent, DrawerHeader, DrawerSubheader } from '..';

export default () => {
  const { isHostsAddOpen } = useRecoilValue(layoutState);

  return (
    <Drawer isOpen={isHostsAddOpen}>
      <DrawerHeader>Add Host</DrawerHeader>
      <DrawerContent>
        <DrawerSubheader>INFORMATION</DrawerSubheader>
      </DrawerContent>
    </Drawer>
  );
};
