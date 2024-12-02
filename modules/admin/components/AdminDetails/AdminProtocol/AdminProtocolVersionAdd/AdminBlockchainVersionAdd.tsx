import ReactDOM from 'react-dom';
import { AdminHeaderButton } from '@modules/admin/components';
import { useState } from 'react';
import { AdminBlockchainVersionAddDialog } from './AdminProtocolVersionAddDialog/AdminProtocolVersionAddDialog';
import IconUpgrade from '@public/assets/icons/common/ListAdd.svg';

type Props = {
  onRefreshed: VoidFunction;
};

export const AdminBlockchainVersionAdd = ({ onRefreshed }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <AdminHeaderButton
        icon={<IconUpgrade />}
        onClick={() => setIsOpen(!isOpen)}
        tooltip="Add Version"
      />
      {ReactDOM.createPortal(
        <AdminBlockchainVersionAddDialog
          isOpen={isOpen}
          toggleOpen={() => setIsOpen(!isOpen)}
          onRefreshed={onRefreshed}
        />,
        document.body.querySelector('#__next')!,
      )}
    </>
  );
};
