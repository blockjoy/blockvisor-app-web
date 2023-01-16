import { tableStyles } from './table.styles';
import { TableLoader } from './TableLoader';
import { styles } from './TableLoader.styles';
import TableRowLoader from './TableRowLoader';
import { TableSkeleton } from './TableSkeleton';

type Props = {
  headers?: TableHeader[];
  rows?: Row[];
  onRowClick?: (arg0: any) => void;
  isLoading: LoadingState;
  preload?: number;
  isSorting?: boolean;
  verticalAlign?: 'top' | 'middle';
};

export const Table: React.FC<Props> = ({
  headers,
  rows = [],
  onRowClick,
  isLoading,
  preload,
  isSorting = false,
  verticalAlign,
}) => {
  const handleRowClick = (tr: any) => {
    if (onRowClick) {
      onRowClick(tr);
    }
  };

  return (
    <div css={tableStyles.wrapper}>
      <table
        css={[tableStyles.table, !!onRowClick && tableStyles.hasHoverRows]}
      >
        {headers && rows?.length > 0 && (
          <thead>
            <tr>
              {headers.map((th) => (
                <th
                  className={th.isHiddenOnMobile ? 'hidden-on-mobile' : ''}
                  key={th.key}
                  style={{
                    width: th.width,
                    minWidth: th.minWidth,
                    maxWidth: th.maxWidth,
                  }}
                >
                  {th.component || th.name}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {isLoading === 'initializing' ? (
            <TableRowLoader length={preload} />
          ) : (
            rows?.map((tr) => (
              <tr
                key={tr.key}
                className={tr.isDanger ? 'danger' : ''}
                onClick={() => handleRowClick(tr)}
              >
                {tr.cells?.map((td, index) => (
                  <td
                    key={td.key}
                    css={[
                      headers &&
                        headers[index]?.isHiddenOnMobile &&
                        tableStyles.hiddenOnMobile,
                      verticalAlign
                        ? tableStyles[verticalAlign]
                        : tableStyles.middle,
                    ]}
                  >
                    {td.component}
                    {index === 0 && (
                      <span className="underline" css={tableStyles.underline} />
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
          {isLoading === 'loading' && preload ? (
            <TableRowLoader length={preload} />
          ) : null}
        </tbody>
      </table>
    </div>
  );
};
