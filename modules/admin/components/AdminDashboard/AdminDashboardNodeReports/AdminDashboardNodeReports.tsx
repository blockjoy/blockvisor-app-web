import { CustomNodeReport, nodeClient } from '@modules/grpc';
import { escapeHtml } from '@shared/utils/escapeHtml';
import {
  DateTime,
  NextLink,
  TableBlock,
  TableSkeleton,
} from '@shared/components';
import { useEffect, useState } from 'react';
import { styles } from './AdminDashboardNodeReports.styles';

export const AdminDashboardNodeReports = () => {
  const [reports, setReports] = useState<CustomNodeReport[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const reportsResponse = await nodeClient.listNodeProblems();
        setReports(reportsResponse);
        setIsLoading(false);
      } catch (err) {
        setReports([]);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div css={styles.wrapper}>
      <h2 css={styles.h2}>Node Reports</h2>
      {isLoading ? (
        <TableSkeleton />
      ) : !reports?.length ? (
        <p>No node reports</p>
      ) : (
        <div css={styles.tableWrapper}>
          <table css={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '500px' }}>Message</th>
                <th style={{ width: '300px' }}>User</th>
                <th style={{ width: '400px' }}>Node</th>
                <th style={{ width: '300px' }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {reports?.map((report) => (
                <tr key={report.reportId}>
                  <td>
                    <div css={styles.message}>{escapeHtml(report.message)}</div>
                  </td>
                  {/* <td>
                    <TableBlock
                      topRow={
                        <NextLink
                          href={`/admin?name=users&id=${report.createdBy?.resourceId}`}
                        >
                          {report.createdBy?.name}
                        </NextLink>
                      }
                      middleRow={report.createdBy?.email}
                    ></TableBlock>
                  </td> */}
                  <td>
                    <TableBlock
                      topRow={
                        <NextLink
                          href={`/admin?name=nodes&id=${report.node?.nodeId}`}
                        >
                          {report.node?.displayName}
                        </NextLink>
                      }
                      middleRow={report.node?.nodeId}
                    ></TableBlock>
                  </td>
                  <td>
                    <DateTime date={report.createdAt!} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
