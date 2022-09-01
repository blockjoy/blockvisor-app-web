import { Children } from "react";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import styled from "@emotion/styled";
import TableLoader from "./TableLoader";

const StyledTableWrapper = styled.div`
  position: relative;
`;

const StyledTable = styled.table`
    width: 100%;

    & th {
        padding: 0 0 10px;
        color: ${p => p.theme.colorDefault};
        letter-spacing: 1px;
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        text-align: left;
    }

    & .has-hover-color {
        transition: color 0.3s;
    }

    & td {
        padding: 20px 0 30px;
        vertical-align: top;
    }

    & tr:hover .has-hover-color {
        color: ${p => p.theme.colorPrimary};
    }

    & tbody tr td {
        border-bottom: 1px solid ${p => p.theme.colorBorder};
    }
    
`;

type Row = {
    cells: EmotionJSX.Element[],
}

type Header = {
    key: string,
    name: string,
    width: string,
    component: EmotionJSX.Element,
}

type Props = {
    headers?: Header[],
    rows: Row[],
    onRowClick?: () => void,
    isLoading: boolean
}

export const Table: React.FC<Props> = ({ headers, rows, onRowClick, isLoading }) => {

    const handleRowClick = () => {
        if (onRowClick) {
            onRowClick();
        }
    }

    return (
        <StyledTableWrapper>
            <TableLoader isLoading={isLoading} />
            <StyledTable>
                {headers && (
                    <thead>
                        <tr>
                            {headers.map(th => (
                                <th key={th.key} style={{maxWidth: th.width}}>
                                    {th.component}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {rows?.map(tr => (
                        <tr onClick={handleRowClick}>
                            {tr.cells?.map(td => (
                                <td key={td.key}>
                                    {td}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </StyledTableWrapper>
    )
};