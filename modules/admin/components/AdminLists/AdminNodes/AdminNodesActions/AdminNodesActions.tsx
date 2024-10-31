import { AdminHeaderButton } from '@modules/admin/components/AdminHeader/AdminHeaderButton/AdminHeaderButton';
import IconStop from '@public/assets/icons/app/NodeStop.svg';
import IconRestart from '@public/assets/icons/app/NodeRestart.svg';
import { nodeClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { AdminDetailHeaderDelete } from '@modules/admin';
import { styles } from './AdminNodesActions.styles';
import { Dispatch, SetStateAction } from 'react';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

type Props = {
  selectedIds: string[];
  list: Node[];
  setList: Dispatch<SetStateAction<Node[]>>;
};

export const AdminNodesActions = ({ selectedIds, list, setList }: Props) => {
  const stopNodes = async () => {
    try {
      const calls = [];

      for (let nodeId of selectedIds) {
        calls.push(nodeClient.stopNode(nodeId));
      }

      await Promise.all(calls);

      toast.success(`Nodes Stopped`);
    } catch (err) {
      toast.error(`Node Stop Failed`);
    }
  };

  const startNodes = async () => {
    try {
      const calls = [];

      for (let nodeId of selectedIds) {
        calls.push(nodeClient.startNode(nodeId));
      }

      await Promise.all(calls);

      toast.success(`Nodes Restarted`);
    } catch (err) {
      toast.error(`Node Stop Failed`);
    }
  };

  const deleteNodes = async () => {
    try {
      const calls = [];

      for (let nodeId of selectedIds) {
        calls.push(nodeClient.deleteNode(nodeId));
      }

      await Promise.all(calls);

      setList(list.filter((node) => !selectedIds.includes(node.id)));

      toast.success(`Nodes Deleted`);
    } catch (err) {
      toast.error(`Node Stop Failed`);
    }
  };

  return (
    <>
      <AdminHeaderButton
        isDisabled={!selectedIds.length}
        icon={<IconStop />}
        onClick={stopNodes}
        tooltip="Stop"
      />
      <AdminHeaderButton
        isDisabled={!selectedIds.length}
        icon={<IconRestart />}
        onClick={startNodes}
        tooltip="Restart"
      />
      <span css={styles.deleteButton}>
        <AdminDetailHeaderDelete
          isDisabled={!selectedIds.length}
          onDelete={deleteNodes}
        />
      </span>
    </>
  );
};
