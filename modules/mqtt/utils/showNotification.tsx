import { ReactNode } from 'react';
import { toast } from 'react-toastify';
import IconNodes from '@public/assets/icons/box-12.svg';
import IconOrganizations from '@public/assets/icons/organization-16.svg';

export const showNotification = (
  type: Channel,
  message: string,
  content?: ReactNode,
): void => {
  toast(
    <div>
      <h5>
        {type === 'nodes' ? <IconNodes /> : <IconOrganizations />}
        <span>{type === 'nodes' ? 'Node Update' : 'Organization Update'}</span>
      </h5>
      <p>{message}</p>
      {content && content}
    </div>,
    {
      autoClose: 5000,
      hideProgressBar: false,
      className: 'Toastify__notification',
    },
  );
};
