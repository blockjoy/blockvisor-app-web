import ReactDOM from 'react-dom';
import { AdminHeaderButton } from '@modules/admin/components';
import { useState } from 'react';
import { AdminBlockchainVersionAddDialog } from './AdminBlockchainVersionAddDialog/AdminBlockchainVersionAddDialog';
import IconUpgrade from '@public/assets/icons/common/ListAdd.svg';

export const AdminBlockchainVersionAdd = () => {
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
        />,
        document.body.querySelector('#__next')!,
      )}
    </>
  );
};
