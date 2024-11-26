import { nodeClient } from '@modules/grpc';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';
import { NextLink } from '@shared/components';
import { useEffect, useState } from 'react';

type Props = {
  userId: string;
};

export const AdminUserNodes = ({ userId }: Props) => {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    (async () => {
      const nodesResponse = await nodeClient.listNodes(
        undefined,
        {
          userIds: [userId],
        },
        {
          currentPage: 0,
          itemsPerPage: 10000,
        },
      );
      setNodes(nodesResponse.nodes);
    })();
  }, []);

  if (!nodes.length) {
    return <div>-</div>;
  }

  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          <NextLink href={`/admin?name=nodes&id=${node.id}`}>
            {node.displayName}
          </NextLink>
        </li>
      ))}
    </ul>
  );
};
