import { Skeleton } from '../Skeleton/Skeleton';

export type TableRowLoaderProps = {
  length?: number;
  dataCy?: string;
};

const TableRowLoader = ({ length, dataCy }: TableRowLoaderProps) => {
  return (
    <>
      {[...Array(length)].map((_, index) => {
        return (
          <tr data-cy={dataCy} key={index}>
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

export default TableRowLoader;
