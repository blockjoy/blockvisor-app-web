import styled from "@emotion/styled";

import { useRecoilState } from "recoil";

import { appState } from "@modules/app/store";
import { layoutState } from "@modules/layout/store";

import { PageSection, PageHeader, Table, TableSortButton, BlockButton } from "../shared";

import { formatDistance, subDays } from 'date-fns';

import NodesTableBlock from "./NodesTableBlock";

import { useEffect, PropsWithChildren } from "react";

import { mockNodes } from "./mockData";

const StyledAdded = styled.span`
  color: ${p => p.theme.colorLabel};
`;

const StyledStatus = styled.span`
    font-size: 12px;
    letter-spacing: 1px;
  color: ${p => p.theme.colorDefault};
`;

export type Node = {
    name: string,
    id: string,
    address: string,
    added: string,
    status: string
}

const rows = mockNodes.map(node => (
        {
            cells: [
                <NodesTableBlock key="1" id={node.id} name={node.name} address={node.address} />, 
                <StyledAdded key="2">{formatDistance(subDays(new Date(node.added), 3), new Date(), { addSuffix: true })}</StyledAdded>, 
                <StyledStatus key="3" className="has-hover-color">{node.status}</StyledStatus>
            ]
        }
    )
);

export default () => {
    const [app, setApp] = useRecoilState(appState);
    const [layout, setLayout] = useRecoilState(layoutState);

    const { nodesSortExpression, nodesLoading } = app;

    const handleSort = (nodesSortExpression: string) => {
        setApp({
            ...app,
            nodesSortExpression,
            nodesLoading: true
        });
        setTimeout(() => {
            setApp({
                ...app,
                nodesSortExpression,
                nodesLoading: false
            })
        }, 600)
    }

    const handleAddNode = () => {
        setLayout({
            ...layout,
            isNodeAddOpen: true,
        })
    }

    const SortButton: React.FC<PropsWithChildren> = ({ children }) => 
        <TableSortButton activeSortExpression={nodesSortExpression} sortExpression={children?.toString() || ""} onClick={() => handleSort(children?.toString() || "")}>{children}</TableSortButton>

    const headers = [
        {name: "Name", component: <SortButton>name</SortButton>, width: "100px", key: "1" },
        {name: "Added", component: <SortButton>added</SortButton>, width: "100px", key: "2" },
        {name: "Status", component: <SortButton>status</SortButton>, width: "100px", key: "3" },
    ];

    useEffect(() => {
        setApp({
            ...app,
            nodesLoading: true
        })

        setTimeout(() => {
            setApp({
                ...app,
                nodesLoading: false
            })
        }, 600)
    }, [])

    return (
        <PageSection>
            <PageHeader>
                Nodes
                <BlockButton onClick={handleAddNode}>Add Node</BlockButton>
            </PageHeader>
            <Table isLoading={nodesLoading} headers={headers} rows={rows} onRowClick={() => console.log("row clicked")} />
        </PageSection>
    );
}