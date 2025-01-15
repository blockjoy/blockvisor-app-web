import { useState } from 'react';
import { SvgIcon, Drawer, DrawerContent, Button } from '@shared/components';
import { NodeLayout, NodeColumns } from '@modules/node';
import { flex } from 'styles/utils.flex.styles';
import { spacing } from 'styles/utils.spacing.styles';
import { styles } from './NodeCustomize.styles';
import IconCog from '@public/assets/icons/common/Cog.svg';
import IconColumns from '@public/assets/icons/common/Columns.svg';
import IconTable from '@public/assets/icons/common/Table.svg';

export const NodeCustomize = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        style="outline"
        css={[flex.display.flex, spacing.left.small, styles.button]}
        onClick={() => setIsOpen(true)}
        size="small"
      >
        <SvgIcon isDefaultColor size="12px">
          <IconCog />
        </SvgIcon>
        <span>Customize</span>
      </Button>

      <Drawer
        title="Customize"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        asideStyles={[styles.drawer]}
      >
        <DrawerContent title="Layout" icon={<IconTable />}>
          <NodeLayout />
        </DrawerContent>

        <DrawerContent title="Columns" icon={<IconColumns />}>
          <NodeColumns />
        </DrawerContent>
      </Drawer>
    </>
  );
};
