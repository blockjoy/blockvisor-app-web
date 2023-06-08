import { TableBlock } from '@shared/components';
import { BlockchainIcon, NodeStatus } from '@shared/components';
import { Node } from '@modules/grpc/library/blockjoy/v1/node';

export const mapHostNodesToRows = (
  nodeList: Node[],
  handleAction?: (type: string, nodeId: string) => void,
) => {
  const headers: TableHeader[] = [
    {
      name: '',
      key: '1',
      width: '40px',
      minWidth: '60px',
      maxWidth: '100px',
    },
    {
      name: 'Name',
      key: '2',
    },
    {
      name: 'Status',
      key: '3',
    },
    // {
    //   name: '',
    //   key: '4',
    //   width: '100px',
    //   textAlign: 'right',
    // },
  ];

  const rows = nodeList?.map((node: Node) => ({
    key: node.id,
    cells: [
      {
        key: '1',
        component: (
          <div style={{ marginTop: '4px', marginLeft: '8px' }}>
            <BlockchainIcon size="32px" blockchainName={node.blockchainName} />
          </div>
        ),
      },
      {
        key: '2',
        component: (
          <>
            <TableBlock id={node.id} name={node.name} address={node?.ip!} />
          </>
        ),
      },
      {
        key: '3',
        component: <NodeStatus status={node.status} />,
      },
      // {
      //   key: '4',
      //   component: (
      //     <>
      //       {handleAction && (
      //         <ButtonGroup type="inline">
      //           <Button
      //             style="secondary"
      //             size="small"
      //             disabled={true}
      //             onClick={() => handleAction('stop', node.id)}
      //           >
      //             Stop
      //           </Button>
      //           <Button
      //             style="secondary"
      //             size="small"
      //             onClick={() => handleAction('start', node.id)}
      //           >
      //             Start
      //           </Button>
      //         </ButtonGroup>
      //       )}
      //     </>
      //   ),
      // },
    ],
  }));

  return {
    rows,
    headers,
  };
};
