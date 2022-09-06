import { useRecoilValue, useRecoilState } from "recoil";
import { layoutState } from "@modules/layout/store";

import { Drawer, DrawerContent, DrawerHeader, DrawerSubheader } from "@modules/layout/components/shared";

export default () => {
  const { isHostsAddOpen } = useRecoilValue(layoutState);

  return (
   <Drawer isOpen={isHostsAddOpen}>
        <DrawerHeader>
          Add Host
        </DrawerHeader>
        <DrawerContent>
            <DrawerSubheader>
                INFORMATION
            </DrawerSubheader>
        </DrawerContent>
   </Drawer>
  );
}