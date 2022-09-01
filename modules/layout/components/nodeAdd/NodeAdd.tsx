import { useRecoilValue, useRecoilState } from "recoil";
import { layoutState } from "@modules/layout/store";

import { Drawer, DrawerContent, DrawerHeader, DrawerSubheader } from "@modules/layout/components/shared";

export default () => {
  const { isNodeAddOpen } = useRecoilValue(layoutState);

  return (
   <Drawer isOpen={isNodeAddOpen}>
        <DrawerHeader>
          Add Node
        </DrawerHeader>
        <DrawerContent>
            <DrawerSubheader>
                NETWORK
            </DrawerSubheader>
        </DrawerContent>
   </Drawer>
  );
}