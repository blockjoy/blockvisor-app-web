import { toast } from 'react-toastify';
import IconNodes from '@public/assets/icons/app/Node.svg';
import IconOrganizations from '@public/assets/icons/app/Organization.svg';

export const showNotification = (
  type: Topic,
  message: string | React.ReactNode,
  content?: React.ReactNode,
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
