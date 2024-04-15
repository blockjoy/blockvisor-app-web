import { Skeleton } from '@shared/components';

export type TableRowLoaderProps = {
  length?: number;
};

export const TableRowLoader = ({ length }: TableRowLoaderProps) => {
  return (
    <>
      {[...Array(length)].map((_, index) => {
        return (
          <tr key={index}>
            <td>
              <div style={{ marginTop: '4px' }}>
                <Skeleton width="28px" height="28px" />
              </div>
            </td>
            <td>
              <Skeleton width="200px" />
            </td>
            <td>
              <span style={{ fontSize: '14px' }}>
                <Skeleton width="150px" />
              </span>
            </td>
            <td>
              <Skeleton width="100px" />
            </td>
          </tr>
        );
      })}
    </>
  );
};
