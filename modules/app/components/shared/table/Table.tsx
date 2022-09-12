import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import TableLoader from './TableLoader';
import { tableStyles } from './table.styles';

type Cell = {
  key: string;
  component: EmotionJSX.Element;
};

type Row = {
  key: string;
  cells: Cell[];
  isDanger?: boolean;
};

type Header = {
  key: string;
  name: string;
  width: string;
  isHiddenOnMobile?: boolean;
  component: EmotionJSX.Element;
};

type Props = {
  headers?: Header[];
  rows?: Row[];
  onRowClick?: (arg0: any) => void;
  isLoading: boolean;
  isSorting: boolean;
};

type TableProps = {
  hasRowClick?: boolean;
};

export const Table: React.FC<Props> = ({
  headers,
  rows = [],
  onRowClick,
  isLoading,
}) => {
  const handleRowClick = (tr: any) => {
    if (onRowClick) {
      onRowClick(tr);
    }
  };

  return (
    <div css={tableStyles.wrapper}>
      <TableLoader isLoading={isLoading} />
      <table
        css={[tableStyles.wrapper, !!onRowClick && tableStyles.hasHoverRows]}
      >
        {headers && (
          <thead>
            <tr>
              {headers.map((th) => (
                <th
                  className={th.isHiddenOnMobile ? 'hidden-on-mobile' : ''}
                  key={th.key}
                  style={{ maxWidth: th.width }}
                >
                  {th.component}
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
                    headers && headers[index].isHiddenOnMobile
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
    </div>
  );
};
