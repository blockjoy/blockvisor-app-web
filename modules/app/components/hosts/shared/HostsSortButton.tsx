import { TableSortButton } from "../../shared";

type Props = {
    children: React.ReactNode,
    hostsSortExpression: string,
    handleSort: (args1: string) => void
}

export const HostsSortButton: React.FC<Props> = ({ children, hostsSortExpression, handleSort }) => 
    <TableSortButton 
        activeSortExpression={hostsSortExpression} 
        sortExpression={children?.toString() || ""} 
        onClick={() => handleSort(children?.toString() || "")}
    >
        {children}
    </TableSortButton>
