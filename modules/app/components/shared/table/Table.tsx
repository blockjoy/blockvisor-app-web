import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import styled from "@emotion/styled";
import TableLoader from "./TableLoader";

type Cell = {
    key: string,
    component: EmotionJSX.Element,
}

type Row = {
    cells: Cell[],
    isDanger?: boolean
}

type Header = {
    key: string,
    name: string,
    width: string,
    isHiddenOnMobile?: boolean,
    component: EmotionJSX.Element,
}

type Props = {
    headers?: Header[],
    rows: Row[],
    onRowClick?: () => void,
    isLoading: boolean
}

const StyledTableWrapper = styled.div`
  position: relative;
`;

const StyledTable = styled.table`
    width: 100%;

    & th {
        padding: 0 0 10px;
        color: ${p => p.theme.colorDefault};
        letter-spacing: 1px;
        font-size: 10px;
        font-weight: 500;
        text-transform: uppercase;
        text-align: left;
    }

    @media only screen and (max-width: ${p => p.theme.screenSm}) {
        .hidden-on-mobile {
            display: none;
        }
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
    
    & .danger span,
    & tr:hover.danger .has-hover-color {
        color: ${p => p.theme.colorDanger};
    }
`;

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
                                <th className={th.isHiddenOnMobile ? "hidden-on-mobile" : ""} key={th.key} style={{maxWidth: th.width}}>
                                    {th.component}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {rows?.map(tr => (
                        <tr className={tr.isDanger ? "danger" : ""} onClick={handleRowClick}>
                            {tr.cells?.map((td, index) => (
                                <td className={headers && headers[index].isHiddenOnMobile ? "hidden-on-mobile": ""} key={td.key}>
                                    {td.component}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </StyledTableWrapper>
    )
};