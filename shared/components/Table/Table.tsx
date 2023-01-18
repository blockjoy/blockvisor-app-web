import { tableStyles } from './table.styles';
import { css } from '@emotion/react';
import TableRowLoader from './TableRowLoader';

type Props = {
  headers?: TableHeader[];
  rows?: Row[];
  onRowClick?: (arg0: any) => void;
  isLoading: LoadingState;
  preload?: number;
  verticalAlign?: 'top' | 'middle';
  fixedRowHeight?: string;
};

export const Table: React.FC<Props> = ({
  headers = [],
  rows = [],
  onRowClick,
  isLoading,
  preload,
  verticalAlign,
  fixedRowHeight,
}) => {
  const handleRowClick = (tr: any) => {
    if (onRowClick) {
      onRowClick(tr);
    }
  };

  return (
    <div css={tableStyles.wrapper}>
      <table
        css={[
          tableStyles.table,
          !!onRowClick && tableStyles.hasHoverRows,
          fixedRowHeight && tableStyles.fixedRowHeight(fixedRowHeight),
        ]}
      >
        {headers && rows?.length > 0 && (
          <thead>
            <tr>
              {headers.map(
                ({
                  isHiddenOnMobile,
                  key,
                  width,
                  minWidth,
                  maxWidth,
                  textAlign,
                  name,
                  component,
                }) => (
                  <th
                    className={isHiddenOnMobile ? 'hidden-on-mobile' : ''}
                    key={key}
                    css={css`
                      width: ${width};
                      min-width: ${minWidth};
                      max-width: ${maxWidth};
                      text-align: ${textAlign || 'left'};
                    `}
                  >
                    {component || name}
                  </th>
                ),
              )}
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

                      tableStyles.textAlign(headers[index].textAlign || 'left'),
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
