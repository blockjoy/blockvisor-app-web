import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { appState } from '@modules/app/store';
import { HostStatus } from './HostStatus';
import { TableBlockNodes } from '../shared/table/TableBlockNodes';
import { hostStyles } from './host.styles';
import { Table } from '../shared';
import { Row, Header } from '@modules/app/components/shared/table/Table';

type State = {
  rows: Row[];
  headers?: Header[];
};

export const HostNodes = () => {
  const [state, setState] = useState<State>({
    rows: [],
    headers: [],
  });

  const { rows } = state;
  const [app] = useRecoilState(appState);
  const { activeHost, hostsLoading } = app;

  console.log('activeHost', activeHost);

  useEffect(() => {
    if (activeHost?.nodesList?.length) {
      const rows = activeHost.nodesList.map((node: any) => ({
        key: node.id.value,
        cells: [
          {
            key: '1',
            component: (
              <>
                <TableBlockNodes
                  id={node.id.value}
                  name={node.name}
                  address={node.address}
                />
                <span css={hostStyles.added}>Added just now</span>
              </>
            ),
          },
          {
            key: '2',
            component: <span css={hostStyles.added}>Added just now</span>,
          },
          {
            key: '3',
            component: <HostStatus status={node.status} />,
          },
        ],
      }));

      setState({
        rows,
      });
    }
  }, [activeHost]);

  return <Table isLoading={hostsLoading} rows={rows} />;
};
