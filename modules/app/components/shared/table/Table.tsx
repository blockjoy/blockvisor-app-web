import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { TableLoader } from './TableLoader';
import { tableStyles } from './table.styles';
import { TableSkeleton } from './TableSkeleton';

type Cell = {
  key: string;
  component: EmotionJSX.Element;
};

export type Row = {
  key: string;
  cells: Cell[];
  isDanger?: boolean;
};

export type Header = {
  key: string;
  name: string;
  width?: string;
  isHiddenOnMobile?: boolean;
  component?: EmotionJSX.Element;
};

type Props = {
  headers?: Header[];
  rows?: Row[];
  onRowClick?: (arg0: any) => void;
  isLoading: boolean;
  isSorting?: boolean;
};

export const Table: React.FC<Props> = ({
  headers,
  rows = [],
  onRowClick,
  isLoading,
  isSorting = false,
}) => {
  const handleRowClick = (tr: any) => {
    if (onRowClick) {
      onRowClick(tr);
    }
  };

  return (
    <div css={tableStyles.wrapper}>
      <TableLoader isLoading={isSorting} />
      {!isLoading ? (
        <table
          css={[tableStyles.table, !!onRowClick && tableStyles.hasHoverRows]}
        >
          {headers && (
            <thead>
              <tr>
                {headers.map((th) => (
                  <th
                    className={th.isHiddenOnMobile ? 'hidden-on-mobile' : ''}
                    key={th.key}
                    style={{ width: th.width }}
                  >
                    {th.component || th.name}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows?.map((tr) => (
              <tr
                key={tr.key}
                className={tr.isDanger ? 'danger' : ''}
                onClick={() => handleRowClick(tr)}
              >
                {tr.cells?.map((td, index) => (
                  <td
                    key={td.key}
                    className={
                      headers && headers[index]?.isHiddenOnMobile
                        ? 'hidden-on-mobile'
                        : ''
                    }
                  >
                    {td.component}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
};
