import { Skeleton, TableSkeleton } from '@shared/components';
import { tableStyles } from './LazyNodesTable.styles';
import LazyLoad from 'react-lazyload';

type Props = {
  headers?: TableHeader[];
  rows?: Row[];
  onRowClick?: (arg0: any) => void;
  isLoading: boolean;
  isSorting?: boolean;
};

export const LazyNodesTable: React.FC<Props> = ({
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
      {/* <TableLoader isLoading={isSorting} /> */}
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
                    <LazyLoad
                      unmountIfInvisible={true}
                      debounce={true}
                      placeholder={
                        index === 1 ? (
                          <>
                            <Skeleton width="200px" margin="0 0 5px 0" />
                            <Skeleton width="200px" />
                          </>
                        ) : (
                          <Skeleton width="150px" />
                        )
                      }
                      style={{ minWidth: '100%' }}
                    >
                      {td.component}
                    </LazyLoad>

                    {index === 0 && (
                      <span className="underline" css={tableStyles.underline} />
                    )}
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
